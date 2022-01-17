function(name) {
        var loaded = minispade.loaded[name];
        var mod = minispade.modules[name];

        if (!loaded) {
          if (mod) {

            var module = {exports:undefined};

            if (typeof mod === "string") {
              mod = minispade.globalEval(mod, module);
            }

            mod(module.exports, minispade.require, module);

            minispade.loaded[name] = module.exports;
            loaded = module.exports;
            
          } else {
            if (minispade.root && name.substr(0,minispade.root.length) !== minispade.root) {
              return minispade.require(minispade.root+name);
            } else {
              throw "The module '" + name + "' could not be found";
            }
          }
        }

        return loaded;
      }