function() {
        return {
            send: function (transaction, uri, config) {

                config.notify('start', transaction, config);
                config.method = config.method || 'GET';
                config.method = config.method.toUpperCase();

                var rconf = {
                    method: config.method,
                    uri: uri
                };

                if (config.data) {
                    if (Y.Lang.isObject(config.data)) {
                        if (Y.QueryString && Y.QueryString.stringify) {
                            rconf.body = Y.QueryString.stringify(config.data);
                        } else {
                        }
                    } else if (Y.Lang.isString(config.data)) {
                        rconf.body = config.data;
                    }
                    if (rconf.method === 'GET') {
                        rconf.uri += (rconf.uri.indexOf('?') > -1 ? '&' : '?') + rconf.body;
                        rconf.body = '';
                    }
                }
                if (config.headers) {
                    rconf.headers = config.headers;
                }
                if (config.timeout) {
                    rconf.timeout = config.timeout;
                }
                if (config.request) {
                    Y.mix(rconf, config.request);
                }
                Y.IO.request(rconf, function(err, data) {

                    if (err) {
                        transaction.c = err;
                        config.notify(((err.code === 'ETIMEDOUT') ? 'timeout' : 'failure'), transaction, config);
                        return;
                    }
                    if (data) {
                        transaction.c = {
                            status: data.statusCode,
                            statusCode: data.statusCode,
                            statusText: codes[data.statusCode],
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

                    config.notify('complete', transaction, config);
                    config.notify(((data && (data.statusCode >= 200 && data.statusCode <= 299)) ? 'success' : 'failure'), transaction, config);
                });
                
                var ret = {
                    io: transaction
                };
                return ret;
            }
        };
    }