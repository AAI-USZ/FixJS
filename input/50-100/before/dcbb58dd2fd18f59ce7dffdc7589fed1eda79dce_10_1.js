function () {
                    var req = JSON.parse(data);
                    // actual tests
                    test(
                        assert.strictEqual,
                        req.method,
                        'GET'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        res.statusCode,
                        200
                    );
                    test(
                        assert.strictEqual,
                        typeof res.headers,
                        'object'
                    );
                    cb(null);
                }