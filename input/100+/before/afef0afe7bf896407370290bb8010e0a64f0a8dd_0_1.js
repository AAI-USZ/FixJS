function() {
                        createTargetPromise = spyOnPromise(Mongo, 'createTarget').andCallRealSuccess('12345678901234567890abce');
                        addPointsPromise = spyOnPromise(Mongo, 'addPoints').andCallRealSuccess();

                        req.params.name = 'New tracking target';
                        req.params.question = 'How much time?';
                        req.params.location = {lat: 12.3456, lon: 23.4567};
                    }