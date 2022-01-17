function(err, size) {
                if (err) {
                    console.error(err.message);
                    console.error(err.stack);
                } else if (size > 0) {
                    cache.getAndRemoveItem(function(err, url) {
                        if (err) {
                            console.error(err.message);
                            console.error(err.stack);
                            cb();
                        } else {
                            deliverToClients(url);
                            cb();
                        }
                    });
                } else {
                    cb();
                }
            }