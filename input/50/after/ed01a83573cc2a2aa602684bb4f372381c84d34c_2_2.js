function(err, response) {
                                        assert.isNull(err);

                                        assert.isDefined(response);
                                        assert.isTrue(response.deleted);
                                    }