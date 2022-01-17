function testGET(cb) {
        var data = '';
        http.get(
            { path: '/testhttp' },
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
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
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
    }