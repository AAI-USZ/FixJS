function(res) {
                if(res.statusCode === 301 || res.statusCode === 302) {
                    return --redirCounter?
                        doHttp(url.parse(res.headers['location'], true), defer, dataType, null, redirCounter) :
                        defer.reject(buildHttpErrorMessage('TOO_MANY_REDIRECTS'));
                }
                else if(res.statusCode >= 400) {
                    return defer.reject(res.statusCode);
                }

                var body = '';
                res
                    .on('data', function(chunk) {
                        body += chunk;
                    })
                    .on('end', function() {
                        try {
                            defer.resolve(processResponse(body, dataType || 'json'));
                        }
                        catch(e) {
                            defer.reject(buildHttpErrorMessage('PARSE_ERROR', e.message));
                        }
                    })
                    .on('close', function(e) {
                        defer.reject(buildHttpErrorMessage('CONNECTION_CLOSED', e.message));
                    });
            }