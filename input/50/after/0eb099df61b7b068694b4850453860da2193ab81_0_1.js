function(reqsModules) {
                if (toString.call(callback) === '[object Function]') {
                    callback.apply(notDefined, reqsModules);
                }
            }