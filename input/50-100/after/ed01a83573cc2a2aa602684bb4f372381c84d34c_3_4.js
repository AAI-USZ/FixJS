function(err, response) {
                    assert.isNull(err);

                    assert.isDefined(response);
                    assert.isNumber(response.count);
                    assert.strictEqual(response.count >= 2, true);
                }