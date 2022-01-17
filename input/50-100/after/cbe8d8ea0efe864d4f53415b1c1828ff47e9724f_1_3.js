function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);

                        authService.getUserGroups("test1", function(error, res, more) {
                            equal(error, null);
                            ok(setsEquivalent(res, []));
                            equal(more, false);
                            teardownAccounts("test1-group", "test1");
                        });
                    }