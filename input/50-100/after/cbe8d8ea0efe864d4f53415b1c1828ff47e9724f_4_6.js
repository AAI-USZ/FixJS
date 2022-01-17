function(err, result) {
                if (err) {
                    cb(err, null, false);
                } else if (!result) {
                    cb(null, false, false);
                } else {
                    db.removeById('users', result.id, function(err) {
                        cb(err, !err, false);
                    });
                }
            }