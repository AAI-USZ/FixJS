function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'user_id=?', [result.id], cb);
            }