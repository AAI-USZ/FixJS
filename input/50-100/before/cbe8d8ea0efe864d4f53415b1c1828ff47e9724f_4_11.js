function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                db.select('groups g, user_groups ug', null, 
                    { 'g.name': 'name' }, 
                    'g.id=ug.group_id AND g.id=?', [result.id], cb);
            }