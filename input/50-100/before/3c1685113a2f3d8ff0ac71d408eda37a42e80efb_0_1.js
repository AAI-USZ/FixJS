function(sfs) {
                    _.defaults(options, {model: m, summaryFields: sfs});
                    var q;
                    try {
                        q = new Query(options, service);
                    } catch (e) {
                        promise.reject(e);
                    }
                    if (cb) {
                        try {
                            cb(q);
                        } catch (e) {
                            promise.reject(e);
                        }
                    }
                    promise.resolve(q);
                }