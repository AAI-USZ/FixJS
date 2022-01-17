function(err, ids) {
                    ids.forEach(function(user) {
                        db.insert('user_groups', {
                            group_id: gid,
                            user_id: user.id
                        }, function(err) {
                            if (err) errors.push(err);
                            callback(errors.length == 0 ? null : errors, errors.length == 0);
                        });
                    });
                }