function () {
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
                }