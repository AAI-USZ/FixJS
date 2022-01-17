function(err, data) {
                    Y.log('Request Transaction Complete', 'info', 'io');

                    if (err) {
                        Y.log('An IO error occurred', 'warn', 'io');
                        transaction.c = err;
                        config.notify(((err.code === 'ETIMEDOUT') ? 'timeout' : 'failure'), transaction, config);
                        return;
                    }
                    if (data) {
                        transaction.c = {
                            status: data.statusCode,
                            statusCode: data.statusCode,
                            headers: data.headers,
                            responseText: data.body,
                            responseXML: null,
                            getResponseHeader: function(name) {
                                return this.headers[name];
                            },
                            getAllResponseHeaders: function() {
                                return flatten(this.headers);
                            }
                        };
                    }
                    Y.log('Request Transaction Complete', 'info', 'io');

                    config.notify('complete', transaction, config);
                    config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);
                }