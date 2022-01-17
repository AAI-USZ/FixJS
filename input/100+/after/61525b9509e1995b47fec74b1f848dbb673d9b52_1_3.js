function () {

  function Toplevel() {
    /* All ABCs that have been parsed. */
    this.abcs = [];

    /* Classes that have been loaded. */
    this.loadedClasses = [];

    // TODO: Caching.
  }

  var cache = {};

  Toplevel.prototype = {
    getTypeByName: function getTypeByName(multiname, strict, execute) {
      var resolved = this.resolveMultiname(multiname, execute);
      if (resolved) {
        return resolved.object[resolved.name.getQualifiedName()];
      }
      if (strict) {
        return unexpected("Cannot find type " + multiname);
      } else {
        return null;
      }
    },

    getClass: function getClass(simpleName) {
      var c = cache[simpleName];
      if (!c) {
        c = cache[simpleName] = this.getTypeByName(Multiname.fromSimpleName(simpleName), true, true);
      }
      assert(c instanceof Class);
      return c;
    },

    findProperty: function findProperty(multiname, strict, execute) {
      if (traceToplevel.value) {
        print("Toplevel Find Property: " + multiname);
      }
      var resolved = this.resolveMultiname(multiname, execute);
      if (resolved) {
        return resolved.object;
      }
      if (strict) {
        return unexpected("Cannot find property " + multiname);
      } else {
        return null;
      }
      return null;
    },

    resolveMultiname: function _resolveMultiname(multiname, execute) {
      function ensureScriptIsExecuted(abc, script) {
        if (!script.executed && !script.executing) {
          executeScript(abc, script);
        }
      }
      var abcs = this.abcs;
      for (var i = 0, j = abcs.length; i < j; i++) {
        var abc = abcs[i];
        var scripts = abc.scripts;
        for (var k = 0, l = scripts.length; k < l; k++) {
          var script = scripts[k];
          if (!script.loaded) {
            continue;
          }
          var global = script.global;
          if (multiname.isQName()) {
            if (global.hasOwnProperty(multiname.getQualifiedName())) {
              if (traceToplevel.value) {
                print("Toplevel Resolved Multiname: " + multiname + " in " + abc + ", script: " + k);
                print("Script is executed ? " + script.executed + ", should we: " + execute + " is it in progress: " + script.executing);
                print("Value is: " + script.global[multiname.getQualifiedName()]);
              }
              if (execute) {
                ensureScriptIsExecuted(abc, script);
              }
              return { object: global, name: multiname };
            }
          } else {
            var resolved = resolveMultiname(global, multiname, false);
            if (resolved) {
              if (execute) {
                ensureScriptIsExecuted(abc, script);
              }
              return { object: global, name: resolved };
            }
          }
        }
      }
      return null;
    },

    traceLoadedClasses: function () {
      var writer = new IndentingWriter();
      function traceProperties(obj) {
        for (var key in obj) {
          var str = key;
          var descriptor = Object.getOwnPropertyDescriptor(obj, key);
          if (descriptor) {
            if (descriptor.get) {
              str += " getter";
            }
            if (descriptor.set) {
              str += " setter";
            }
            if (descriptor.value) {
              var value = obj[key];
              if (value instanceof Scope) {
                str += ": ";
                var scope = value;
                while (scope) {
                  assert (scope.object);
                  str += scope.object.debugName || "T";
                  if (scope = scope.parent) {
                    str += " <: ";
                  };
                }
              } else if (value instanceof Function) {
                str += ": " + (value.name ? value.name : "untitled");
              } else if (value) {
                str += ": " + value;
              }
            }
          }
          writer.writeLn(str);
        }
      }
      writer.enter("Loaded Classes");
      this.loadedClasses.forEach(function (cls) {
        var description = cls.debugName + (cls.baseClass ? " extends " + cls.baseClass.debugName : "");
        writer.enter(description + " {");
        writer.enter("instance");
        traceProperties(cls.prototype);
        writer.leave("");
        writer.enter("static");
        traceProperties(cls);
        writer.leave("");
        writer.leave("}");
      });
      writer.leave("");
    }
  };

  var toplevel = new Toplevel();
  return toplevel;

}