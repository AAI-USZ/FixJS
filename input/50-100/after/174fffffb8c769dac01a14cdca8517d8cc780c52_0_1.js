function() {

                    // Fake that deleteTargetById succeeds
                    spyOnPromise(Mongo, 'deleteTargetById').andCallSuccess();

                    req.params.id = '12345678901234567890abcd';

                    API.deleteTarget(req, res, next);

                    // expectStatus expects 200 in any case, because the length of res.send.mostRecentCall.args is 1 (only status code).
                    // deleteTarget returns 204 though.
                    expectStatus(res).toEqual(204);
                }