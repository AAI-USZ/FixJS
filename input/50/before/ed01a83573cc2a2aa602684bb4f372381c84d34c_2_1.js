function(err, response) {
                                    assert.isNull(err);

                                    console.log('response', response);
                                    assert.isDefined(response);
                                    assert.isTrue(response.deleted);
                                }