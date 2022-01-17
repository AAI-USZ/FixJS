function(err, type) {
                        if (err) {
                            cb(err);
                        } else {
                            gs.close(function() {
                                cb(null, new Buffer(data), type);
                                gs.collection(function(err, collection) {
                                    if (!err) {
                                        increaseAccessCount(filename, collection);
                                    }
                                });
                            });
                        }
                    }