function findDefiningScript(multiname, execute) {
      if (this.base) {
        var resolved = this.base.findDefiningScript(multiname, execute);
        if (resolved) {
          return resolved;
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
              if (traceDomain.value) {
                print("Domain findDefiningScript: " + multiname + " in " + abc + ", script: " + k);
                print("Script is executed ? " + script.executed + ", should we: " + execute + " is it in progress: " + script.executing);
                print("Value is: " + script.global[multiname.getQualifiedName()]);
              }
              if (execute) {
                ensureScriptIsExecuted(abc, script);
              }
              return { script: script, name: multiname };
            }
          } else {
            var resolved = resolveMultiname(global, multiname, false);
            if (resolved) {
              if (execute) {
                ensureScriptIsExecuted(abc, script);
              }
              return { script: script, name: resolved };
            }
          }
        }
      }
      return undefined;
    }