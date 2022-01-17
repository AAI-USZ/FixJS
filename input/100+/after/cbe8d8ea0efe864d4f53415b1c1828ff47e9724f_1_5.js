function(error, res, more) {
                equal(error, null);
                equal(res, true);
                equal(more, false);

                authService.getGroupMembers("test2-group", function(error, res, more) {
                    equal(error, null);
                    ok(setsEquivalent(res, [{username: "test2"}]));
                    equal(more, false);

                    authService.removeGroupMembers("test2-group", ["test2"], function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);

                        authService.getGroupMembers("test2-group", function(error, res, more) {
                            equal(error, null);
                            ok(setsEquivalent(res, []));
                            equal(more, false);
                            teardownAccounts("test2-group", "test2");
                        });
                    });
                });
            }