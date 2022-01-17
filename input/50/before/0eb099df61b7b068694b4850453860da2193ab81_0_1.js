function cb() {
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
                }