function() {

                it('should delete a target', function() {

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
                });

                it('should return 404 if no results for ID found', function() {
                    spyOnPromise(Mongo, 'findTargetById').andCallSuccess(null);

                    req.params.id = 'accab1234';
                    API.deleteTarget(req, res, next);

                    expect(next).toHaveBeenCalledWithError({
                        status: 404,
                        code: "ResourceNotFound",
                        message: "Could not find target with ID accab1234"
                    });
                });


            }