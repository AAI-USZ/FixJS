function(name, users, cb) {
            var callback = _.after(cb, users.length);
            this._getGroupId(name, function(err, result) {
                if (err) {
                    return cb(err);
                } else if (!result) {
                    return cb(null, false);
                }
                var gid = result.id,
                    errors = [];
                db.select('users', null, ['id'], 'username IN (' + 
                    repeat('?', ',', users.length) + ')', users, function(err, ids) {
                    ids.forEach(function(user) {
                        db.insert('user_groups', {
                            group_id: gid,
                            user_id: user.id
                        }, function(err) {
                            if (err) errors.push(err);
                            callback(errors.length == 0 ? null : errors, errors.length == 0);
                        });
                    });
                });
            });
        }