function(error, res, more) {
            equal(error, null);
            equal(res, null);
            equal(more, false);

            authService.add_user(username, password, function(error, res, more) {
                equal(error, null);
                equal(res, null);
                equal(more, false);
                callback();
            });
        }