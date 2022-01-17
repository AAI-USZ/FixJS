function(error, res, more) {
                equal(error, null);
                equal(res, true);
                equal(more, false);

                var removals = [{service: "temp", method: ".+"}];

                authService.removeGroupPermissions("test0-group", removals, function(error, res, more) {
                    equal(error, null);
                    equal(res, true);
                    equal(more, false);

                    authService.clearGroupPermissions("test0-group", function(error, res, more) {
                        equal(error, null);
                        equal(res, true);
                        equal(more, false);
                        teardownAccounts("test0-group", "test0");
                    });
                });
            }