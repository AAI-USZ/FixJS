function (writer) {
  function literal(value) {
    if (value === undefined) {
      return "undefined";
    } else if (value === null) {
      return "null";
    } else if (typeof (value) === "string") {
      return "\"" + value + "\"";
    } else {
      return String(value);
    }
  }

  function getSignature(mi, excludeTypesAndDefaultValues) {
    return mi.parameters.map(function (x) {
      var str = x.name;
      if (!excludeTypesAndDefaultValues) {
        if (x.type) {
          str += ":" + x.type.getName();
        }
        if (x.value !== undefined) {
          str += "=" + literal(x.value);
        }
      }
      return str;
    }).join(", ");
  }


  function traceTraits(traits, isStatic, inInterfaceNamespace) {
    traits.traits.forEach(function (trait) {
      var str;
      var accessModifier = trait.name.getAccessModifier();
      var namespaceName = trait.name.namespaces[0].originalURI;
      if (namespaceName) {
        if (namespaceName === "http://adobe.com/AS3/2006/builtin") {
          namespaceName = "AS3";
        }
        if (accessModifier === "public") {
          str = inInterfaceNamespace === namespaceName ? "" : namespaceName;
        } else {
          str = accessModifier;
        }
      } else {
        str = accessModifier;
      }
      if (isStatic) {
        str += " static";
      }
      if (trait.isSlot() || trait.isConst()) {
        traceMetadata(trait.metadata);
        if (trait.isConst()) {
          str += " const";
        } else {
          str += " var";
        }
        str += " " + trait.name.getName();
        if (trait.typeName) {
          str += ":" + trait.typeName.getName();
        }
        if (trait.value) {
          str += " = " + literal(trait.value);
        }
        writer.writeLn(str + ";");
      } else if (trait.isMethod() || trait.isGetter() || trait.isSetter()) {
        traceMetadata(trait.metadata);
        var mi = trait.methodInfo;
        if (trait.attributes & ATTR_Override) {
          str += " override";
        }
        if (mi.isNative()) {
          str += " native";
        }
        str += " function";
        str += trait.isGetter() ? " get" : (trait.isSetter() ? " set" : "");
        str += " " + trait.name.getName();
        str += "(" + getSignature(mi) + ")";
        str += mi.returnType ? ":" + mi.returnType.getName() : "";
        if (mi.isNative()) {
          writer.writeLn(str + ";");
        } else {
          if (inInterfaceNamespace) {
            writer.writeLn(str + ";");
          } else {
            writer.writeLn(str + " { notImplemented(\"" + trait.name.getName() + "\"); }");
          }
        }
      } else if (trait.isClass()) {
        var className = trait.classInfo.instanceInfo.name;
        writer.enter("package " + className.namespaces[0].originalURI + " {\n");
        traceMetadata(trait.metadata);
        traceClass(trait.classInfo);
        writer.leave("\n}");
        traceClassStub(trait);
      } else {
        notImplemented();
      }
    });
  }

  function traceClassStub(trait) {
    var ci = trait.classInfo;
    var ii = ci.instanceInfo;
    var name = ii.name.getName();
    var native = trait.metadata ? trait.metadata.native : null;
    if (!native) {
      return;
    }
    writer.enter("Shumway Stub {");
    writer.enter("function " + native.cls + "(scope, instance, baseClass) {");
    writer.writeLn("function " + name + "() {};");
    writer.writeLn("var c = new Class(\"" + name + "\", " + name +
                   ", Class.passthroughCallable(" + name + "));");
    writer.writeLn("//");
    writer.writeLn("// WARNING! This sets: ")
    writer.writeLn("//   " + name + ".prototype = " +
                   "Object.create(baseClass.instance.prototype)");
    writer.writeLn("//");
    writer.writeLn("// If you want to manage prototypes manually, do this instead:");
    writer.writeLn("//   c.baseClass = baseClass");
    writer.writeLn("//");
    writer.writeLn("c.extend(baseClass);");

    function traceTraits(traits, isStatic) {
      traits.traits.forEach(function (trait) {
        var traitName = trait.name.getName();
        if (trait.isMethod() || trait.isGetter() || trait.isSetter()) {
          var mi = trait.methodInfo;
          if (mi.isNative()) {
            var str = isStatic ? "s" : "m";
            if (mi.parameters.length) {
              var returnTypeStr = "";
              if (mi.returnType) {
                returnTypeStr = " -> " + mi.returnType.getName();
              }
              writer.writeLn("// Signature: " + getSignature(mi) + returnTypeStr);
            }
            var prop;
            if (trait.isGetter()) {
              prop = "[\"get " + traitName + "\"]";
            } else if (trait.isSetter()) {
              prop = "[\"set " + traitName + "\"]";
            } else {
              prop = "." + traitName;
            }
            str += prop + " = function " + traitName + "(" + getSignature(mi, true) + ")";
            writer.writeLn(str + " { notImplemented(); }");
          }
        }
      });
    }

    writer.writeLn("var m = " + name + ".prototype;");
    writer.writeLn("var s = {};");

    traceTraits(ci.traits, true);
    traceTraits(ii.traits);

    writer.writeLn("c.nativeMethods = m;");
    writer.writeLn("c.nativeStatics = s;");

    writer.writeLn("return c;");
    writer.leave("}");
    writer.leave("}");
  }

  function traceClass(ci) {
    var ii = ci.instanceInfo;
    var name = ii.name;
    var str = name.getAccessModifier();
    if (ii.isFinal()) {
      str += " final";
    }
    if (!ii.isSealed()) {
      str += " dynamic";
    }
    str += ii.isInterface() ? " interface " : " class ";
    str += name.getName();
    if (ii.superName && ii.superName.getName() !== "Object") {
      str += " extends " + ii.superName.getName();
    }
    if (ii.interfaces.length) {
      str += " implements " + ii.interfaces.map(function (x) {
        return x.getName();
      }).join(", ");
    }
    writer.enter(str + " {");
    if (!ii.isInterface()) {
      writer.writeLn("public function " + name.getName() + "(" + getSignature(ii.init) + ") {}");
    }
    var interfaceNamespace;
    if (ii.isInterface()) {
      interfaceNamespace = name.namespaces[0].originalURI + ":" + name.name;
    }
    traceTraits(ci.traits, true, interfaceNamespace);
    traceTraits(ii.traits, false, interfaceNamespace);
    writer.leave("}");
  }

  function traceMetadata(metadata) {
    for (var key in metadata) {
      if (metadata.hasOwnProperty(key)) {
        if (key.indexOf("__") === 0) {
          continue;
        }
        writer.writeLn("[" + key + "(" + metadata[key].items.map(function (m) {
          var str = m.key ? m.key + "=" : "";
          return str + "\"" + m.value + "\"";
        }).join(", ") + ")]");
      }
    }
  }

  return {
    traceMetadata: traceMetadata,
    traceTraits: traceTraits,
    traceClass: traceClass,
    traceClassStub: traceClassStub
  };
}