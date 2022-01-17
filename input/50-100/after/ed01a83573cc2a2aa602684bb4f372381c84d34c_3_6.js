function(err, response) {
                            assert.isNull(err);

                            var p = getFirstPlan(true);

                            assert.isDefined(response);
                            assert.isTrue(response.deleted);
                            assert.equal(response.id, p.id);
                        }