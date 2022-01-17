function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.select('groups, user_groups', null, { 
                    'groups.name': 'name' 
                }, 'groups.id=user_groups.group_id AND user_groups.user_id=?',
                    [result.id], cb);
            }