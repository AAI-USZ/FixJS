function(filename, cb) {
        var start = new Date();
        openDbFileRead(filename, function(gs) {
            gs.read(function(err, data) {
                if (err) {
                    options.logger.error("gridstoreRead " + filename, err);
                    cb(err);
                } else {
                    getTypeFromGridStore(gs, function(err, type) {
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
                    });
                }
            });
        });
    }