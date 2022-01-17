function(err, response) {
                    assert.isNull(err);
                    console.log('response', response);

                    assert.isDefined(response);
                    assert.isNumber(response.count);
                    assert.strictEqual(response.count >= 2, true);
                }