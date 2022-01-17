function exeMod(name, callback) {
        var mod = loaded[name];
        if (mod.deps) {
            // execute module after dependencies
            var exed = false,
                afterDeps = function(dep) {
                    if (exed) {
                        return;
                    }
                    var depModules = isModsExed(mod.deps);
                    if (depModules) {
                        module[name] = mod.wrap.apply(notDefined, depModules);
                        clearMod(name, callback);
                        exed = true;
                    }
                };
            for (var i = 0, len = mod.deps.length; i < len; i++) {
                loadMod(mod.deps[i], afterDeps);
            }
            afterDeps = null;
        } else {
            module[name] = mod.wrap.apply();
            clearMod(name, callback);
        }
    }