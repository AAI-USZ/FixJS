function req(reqs, callback) {
        if (isPreloaded || !config.preload.length) {
            return require(reqs, callback);
            // return when callback === undefined
        } else {
            preloadCallbacks.push(function() {
                require(reqs, callback);
            });
            if (!isPreloading) {
                isPreloading = true;
                require(config.preload, function() {
                    isPreloaded = true;
                    isPreloading = false;
                    var i = 0,
                        l = preloadCallbacks.length;
                    for (; i < l; i++) {
                        preloadCallbacks[i]();
                    }
                    preloadCallbacks = null;
                });
            }
        }
    }