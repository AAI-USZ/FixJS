function testPUT(cb) {
        var data = '',
            r;
        r = http.request(
            { path: '/testhttp', method: 'PUT' },
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
                        'PUT'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        req.postData,
                        'abcdefg'
                    );
                    cb(null);
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
        r.write('abcdefg');
        r.end();
    }