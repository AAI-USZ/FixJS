function requireAsync(reqs, callback) {
        // single module name
        if (reqs.length === 1) {
            loadMod(nameToUrl(reqs[0]), function(name) {
                if (callback.call) {
                    callback.call(notDefined, module[name]);
                }
            });
            // multi module name
        } else {
            var i = 0,
                len = reqs.length,
                exed = false,
                // make sure callback only call once
                cb = function cb() {
                    if (exed) {
                        return;
                    }
                    var reqsModules = isModsExed(reqs);
                    if (reqsModules) {
                        if (callback.apply) {
                            callback.apply(notDefined, reqsModules);
                        }
                        exed = true;
                    }
                };
            // for IE cache loading bug, must seperate nameToUrl and loadMod!
            for (; i < len; i++) {
                reqs[i] = nameToUrl(reqs[i]);
            }
            for (i = 0; i < len; i++) {
                loadMod(reqs[i], cb);
            }
        }
    }