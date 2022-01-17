function(gs) {
            gs.read(function(err, data) {
                if (err) {
                    cb(err);
                } else {
                    getTypeFromGridStore(gs, function(err, type) {
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
                    });
                }
            });
        }