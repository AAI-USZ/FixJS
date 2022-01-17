function(error, res, more) {
                    equal(error, null);
                    deepEqual(res, [{name: "test1-group"}]);
                    equal(more, false);

                    authService.remove_user_groups_by_user("test1", ["test1-group"], function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);

                        authService.get_user_groups_by_user("test1", function(error, res, more) {
                            equal(error, null);
                            ok(setsEquivalent(res, []));
                            equal(more, false);
                            teardownAccounts("test1-group", "test1");
                        });
                    });
                }