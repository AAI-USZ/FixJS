function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.removeById('users', result.id, function(err) {
                        cb(err, !err);
                    });
                }
            }