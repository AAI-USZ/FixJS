function(err, result) {
                if (err || !result) {
                    return cb(err, null, false);
                }

                db.select('groups g, user_groups ug, users u', null, 
                    { 'u.username': 'username' }, 
                    'ug.user_id=u.id AND g.id=ug.group_id AND g.id=?', [result.id], proxy(cb), null, null, true);
            }