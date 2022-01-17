function(err, response) {
                                assert.isNull(err);

                                console.log('response', response);
                                assert.isDefined(response);
                                assert.equal(response.object, 'invoice');
                                assert.strictEqual(response.total > 0, true);
                            }