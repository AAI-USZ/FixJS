function() {
                    spyOnPromise(Mongo, 'findTargetById').andCallSuccess(
                        {name: "T-Talon ruokajono", _id: "accab1234", question: 'Kauanko jonotit?'}
                    );
                    req.params.id = 'accab1234';

                    API.deleteTarget(req, res, next);

                   expectStatus(res).toEqual(204);
                }