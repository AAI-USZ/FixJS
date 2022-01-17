function(src, mod) {
                        var name = mod.name;
                        if ($.fn[name + type]) {
                            debugLog("running " + name + type);
                            elem[name + type](problem, info);
                            debugLog("ran " + name + type);
                        } else {
                            debugLog("(" + name + type + " not a fn; src " + mod.src + ")");
                        }
                    }