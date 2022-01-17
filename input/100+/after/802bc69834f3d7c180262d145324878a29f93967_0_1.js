function (trait) {
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
              writer.writeLn("  notImplemented(\"" + name + "." + traitName + "\");");
              writer.writeLn("};");
            }
          }
        }