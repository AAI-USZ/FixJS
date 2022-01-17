function(cb) {
        if (clients.length === 0) {
            return cb();
        } else {
            getCacheSize(function(err, size) {
                if (err) {
                    options.logger.error('getCacheSize', err)
                } else if (size > 0) {
                    cache.getAndRemoveItem(function(err, url) {
                        if (err) {
                            options.logger.error('getAndRemoveItem', err)
                            return cb(null);
                        } else {
                            deliverToClients(url);
                            return cb(null);
                        }
                    });
                } else {
                    return cb(null);
                }
            });
        }
    }