function traceClassStub(trait) {
      const writer = this.writer;

      var ci = trait.classInfo;
      var ii = ci.instanceInfo;
      var name = ii.name.getName();
      var native = trait.metadata ? trait.metadata.native : null;
      if (!native) {
        return;
      }
      writer.enter("Shumway Stub {");
      writer.enter("natives." + native.cls + " = function " + native.cls + "(scope, instance, baseClass) {");
      writer.writeLn("// Signature: " + getSignature(ii.init));
      var initSignature = getSignature(ii.init, true);
      writer.writeLn("function " + name + "(" + initSignature + ") {");
      writer.writeLn("  instance.call(this" + (initSignature ? ", " + initSignature : "") + ")");
      writer.writeLn("};");
      writer.writeLn("var c = new Class(\"" + name + "\", " + name +
                     ", Class.passthroughCallable(" + name + "));");
      writer.writeLn("//");
      writer.writeLn("// WARNING! This sets:")
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
              writer.writeLn(str + " {");
              writer.writeLn("  notImplemented(\"" + name + "." + traitName + "\"); };");
              writer.writeLn("}");
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
      writer.leave("};");
      writer.leave("}    },
