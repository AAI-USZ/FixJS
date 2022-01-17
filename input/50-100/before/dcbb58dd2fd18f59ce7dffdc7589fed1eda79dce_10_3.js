function () {
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
                }