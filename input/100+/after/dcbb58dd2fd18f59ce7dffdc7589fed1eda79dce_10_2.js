function testPOST(cb) {
        var data = '',
            r;
        r = http.request(
            { path: '/swallow/testhttp', method: 'POST' },
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
                        'POST'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/swallow/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        req.postData,
                        'abcdef'
                    );
                    cb(null);
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
        r.write('abcdef');
        r.end();
    }