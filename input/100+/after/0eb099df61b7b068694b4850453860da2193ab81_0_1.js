function(depModules) {
                module[name] = mod.wrap.apply(notDefined, depModules);
                clearMod(name, callback);
            }