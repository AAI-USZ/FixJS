function(err, type) {
                        if (err) {
                            options.logger.error("gettypeFromGridStore " + filename, err);
                            cb(err);
                        } else {
                            var diff = Math.floor(( new Date() ) - start);
                            if (diff > 500) {
                                options.logger.error("query for " + filename + " took " + diff + "ms");
                            }
                            cb(null, new Buffer(data), type);
                            gs.close(function() {
                                gs.collection(function(err, collection) {
                                    if (!err) {
                                        increaseAccessCount(filename, collection);
                                    }
                                });
                            });
                        }
                    }