function(err, response) {
                            assert.isNull(err);

                            assert.isDefined(response);
                            assert.equal(response.object, 'invoice');
                            assert.strictEqual(response.total > 0, true);
                        }