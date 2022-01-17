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
                len = reqs.length;
            // for IE cache loading bug, must seperate nameToUrl and loadMod!
            for (; i < len; i++) {
                reqs[i] = nameToUrl(reqs[i]);
            }
            loadMods(reqs, function(reqsModules) {
                if (toString.call(callback) === '[object Function]') {
                    callback.apply(notDefined, reqsModules);
                }
            });
        }
    }