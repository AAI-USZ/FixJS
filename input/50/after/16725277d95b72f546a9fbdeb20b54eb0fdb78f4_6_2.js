function(err, url) {
                        if (err) {
                            options.logger.error('getAndRemoveItem', err)
                            return cb(null);
                        } else {
                            deliverToClients(url);
                            return cb(null);
                        }
                    }