function() {



                it('should delete a target', function() {
                    spyOnPromise(Mongo, 'deleteTarget').andCallSuccess();
                    spyOnPromise(Mongo, 'findTargetById').andCallSuccess('12345678901234567890abcd');
                    spyOnPromise(Mongo, 'deleteTargetById').andCallSuccess('12345678901234567890abcd');

                    req.params.id = '12345678901234567890abcd';

                    API.deleteTarget(req, res, next);
                    expect(Mongo.deleteTargetById).toHaveBeenCalledWith('12345678901234567890abcd');

                    //waitsForPromise(findTargetByIdPromise);
                    //waitsForPromise(deleteTargetPromise);
                });

            }