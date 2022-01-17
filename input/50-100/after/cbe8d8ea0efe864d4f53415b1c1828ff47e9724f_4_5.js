function(err, result) {
                if (err) {
                    return cb(err, null, false);
                } else if (!result) {
                    return cb(null, false, false)
                }
                db.remove('permissions', 'group_id=?', [result.id], function(err) {
                    cb(err, !err, false);
                });
            }