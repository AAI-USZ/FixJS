function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);

                        authService.get_user_groups_by_group("test2-group", function(error, res, more) {
                            equal(error, null);
                            ok(setsEquivalent(res, []));
                            equal(more, false);
                            teardownAccounts("test2-group", "test2");
                        });
                    }