function() {
                    spyOnPromise(Mongo, 'findTargetById').andCallSuccess(null);

                    req.params.id = 'accab1234';
                    API.deleteTarget(req, res, next);

                    expect(next).toHaveBeenCalledWithError({
                        status: 404,
                        code: "ResourceNotFound",
                        message: "Could not find target with ID accab1234"
                    });
                }