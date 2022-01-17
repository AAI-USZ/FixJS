function() {

                    // Fake that delete target succeeds
                    spyOnPromise(Mongo, 'deleteTarget').andCallSuccess();
                    // Fake that findTargetById succeeds
                    spyOnPromise(Mongo, 'findTargetById').andCallSuccess();
                    // Fake that deleteTargetById succeeds
                    spyOnPromise(Mongo, 'deleteTargetById').andCallSuccess();

                    req.params.id = '12345678901234567890abcd';

                    API.deleteTarget(req, res, next);
                    // Expect that was called with the specified id.
                    expect(Mongo.deleteTargetById).toHaveBeenCalledWith('12345678901234567890abcd');
                    // For some reason 200 is returned.
                    expectStatus(res).toEqual(204);
                }