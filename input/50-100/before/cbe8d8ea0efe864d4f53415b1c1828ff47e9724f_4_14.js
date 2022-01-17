function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'user_id IN (SELECT id FROM users WHERE username IN (' + 
                    repeat('?', ',', users.length) + ')', groups, function(err) {
                        return cb(err, !err);
                    }
                );
            }