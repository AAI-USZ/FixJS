function(err, result) {
                if (err) {
                    return cb(err, null, false);
                } else if (!result) {
                    return cb(null, false, false);
                }
                db.remove('user_groups', 'user_id IN (SELECT id FROM users WHERE username IN (' + 
                    repeat('?', ',', users.length) + '))', users, function(err) {
                        return cb(err, !err, false);
                    }
                );
            }