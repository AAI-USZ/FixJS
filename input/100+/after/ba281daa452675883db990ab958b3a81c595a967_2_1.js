function() {
        return {
            send: function (transaction, uri, config) {

                Y.log('Starting Request Transaction', 'info', 'io');
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
                            Y.log('Stringifying config.data for request', 'info', 'io');
                            rconf.body = Y.QueryString.stringify(config.data);
                        } else {
                            Y.log('Failed to stringify config.data object, likely because `querystring-stringify-simple` is missing.', 'warn', 'io');
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
                Y.log('Initiating ' + rconf.method + ' request to: ' + rconf.uri, 'info', 'io');
                Y.IO.request(rconf, function(err, data) {
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
                    Y.log('Request Transaction Complete', 'info', 'io');

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