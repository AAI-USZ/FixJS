function issue(){

        // Issue request
        var timer,
            method = req.method || 'GET',
            status = res.status || res.statusCode,
            data = req.data || req.body,
            requestTimeout = req.timeout || 0,
            encoding = req.encoding || 'utf8';

        var request = http.request({
            host: '127.0.0.1',
            port: server.__port,
            path: req.url,
            method: method,
            headers: req.headers,
            agent: false
        });

        var check = function() {
            if (--server.__pending === 0) {
                server.close();
                server.__listening = false;
            }
        };

        // Timeout
        if (requestTimeout) {
            timer = setTimeout(function(){
                check();
                delete req.timeout;
                assert.fail(msg + 'Request timed out after ' + requestTimeout + 'ms.');
            }, requestTimeout);
        }

        if (data) request.write(data);

        request.on('response', function(response){
            response.body = '';
            response.setEncoding(encoding);
            response.on('data', function(chunk){ response.body += chunk; });
            response.on('end', function(){
                if (timer) clearTimeout(timer);

                // Assert response body
                if (res.body !== undefined) {
                    var eql = res.body instanceof RegExp
                      ? res.body.test(response.body)
                      : res.body === response.body;
                    assert.ok(
                        eql,
                        msg + 'Invalid response body.\n'
                            + '    Expected: ' + res.body + '\n'
                            + '    Got: ' + response.body
                    );
                }

                // Assert response status
                if (typeof status === 'number') {
                    assert.equal(
                        response.statusCode,
                        status,
                        msg + 'Invalid response status code.\n'
                            + '    Expected: [green]{' + status + '}\n'
                            + '    Got: [red]{' + response.statusCode + '}'
                    );
                }

                // Assert response headers
                if (res.headers) {
                    var keys = Object.keys(res.headers);
                    for (var i = 0, len = keys.length; i < len; ++i) {
                        var name = keys[i],
                            actual = response.headers[name.toLowerCase()],
                            expected = res.headers[name],
                            eql = expected instanceof RegExp
                              ? expected.test(actual)
                              : expected == actual;
                        assert.ok(
                            eql,
                            msg + 'Invalid response header [bold]{' + name + '}.\n'
                                + '    Expected: [green]{' + expected + '}\n'
                                + '    Got: [red]{' + actual + '}'
                        );
                    }
                }

                // Callback
                callback(response);
                check();
            });
        });

        request.end();
      }