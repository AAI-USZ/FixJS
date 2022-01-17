function() {

                    var createTargetPromise, addPointsPromise;

                    beforeEach(function() {
                        createTargetPromise = spyOnPromise(Mongo, 'createTarget').andCallRealSuccess('12345678901234567890abce');
                        addPointsPromise = spyOnPromise(Mongo, 'addPoints').andCallRealSuccess();

                        req.params.name = 'New tracking target';
                        req.params.question = 'How much time?';
                        req.params.location = {lat: 12.3456, lon: 23.4567};
                    })

                    it('should create a new tracking target', function() {
                        req.authorization = {fbUserId: '123456'};

                        API.postTarget(req, res, next);

                        expect(Mongo.createTarget).toHaveBeenCalledWith({
                            name: 'New tracking target',
                            question: 'How much time?',
                            location: {lat: 12.3456, lon: 23.4567},
                            fbUserId: '123456'
                        });

                        expect(Mongo.addPoints).toHaveBeenCalledWith('123456', 5);

                        waitsForPromise(createTargetPromise);
                        waitsForPromise(addPointsPromise);
                    });

                    it('should be able to create a new target without authorization', function() {
                        API.postTarget(req, res, next);

                        expect(Mongo.createTarget).toHaveBeenCalledWith({
                            name: 'New tracking target',
                            question: 'How much time?',
                            location: {lat: 12.3456, lon: 23.4567}
                        });

                        waitsForPromise(createTargetPromise);
                    });

                    afterEach(function() {
                        expectStatus(res).toEqual(201);
                        expectBody(res).toEqual({_id: '12345678901234567890abce'});
                    });

                }