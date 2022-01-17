function(user, password, cb) {
            var self = this;
            this.checkAuth(user, password, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, []);
                } else {
                    self.getUserPermissions(user, cb);
                }
            });
        }