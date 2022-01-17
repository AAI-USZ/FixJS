function(error, res, more) {
                equal(error, null);
                equal(res, true);
                equal(more, false);

                authService.getUserGroups("test1", function(error, res, more) {
                    equal(error, null);
                    deepEqual(res, [{name: "test1-group"}]);
                    equal(more, false);

                    authService.removeUserGroups("test1", ["test1-group"], function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);

                        authService.getUserGroups("test1", function(error, res, more) {
                            equal(error, null);
                            ok(setsEquivalent(res, []));
                            equal(more, false);
                            teardownAccounts("test1-group", "test1");
                        });
                    });
                });
            }