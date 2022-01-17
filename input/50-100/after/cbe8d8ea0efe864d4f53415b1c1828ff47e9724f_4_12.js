function(err, result) {
                if (err) {
                    return cb(err, null, false);
                } else if (!result) {
                    return cb(null, false, false);
                }
                db.remove('user_groups', 'group_id=?', [result.id], proxy(cb));
            }