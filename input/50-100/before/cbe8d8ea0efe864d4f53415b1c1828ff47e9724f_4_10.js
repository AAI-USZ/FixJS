function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.remove('user_groups', 'group_id IN (SELECT id FROM groups WHERE name IN (' + 
                    repeat('?', ',', groups.length) + ')', groups, function(err) {
                        return cb(err, !err);
                    }
                );
            }