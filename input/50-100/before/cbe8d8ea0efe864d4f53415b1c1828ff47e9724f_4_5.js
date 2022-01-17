function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false)
                }
                db.remove('permissions', 'group_id=?', [result.id], function(err) {
                    cb(err, !err);
                });
            }