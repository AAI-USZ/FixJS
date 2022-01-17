function(err, url) {
                        if (err) {
                            console.error(err.message);
                            console.error(err.stack);
                            cb();
                        } else {
                            deliverToClients(url);
                            cb();
                        }
                    }