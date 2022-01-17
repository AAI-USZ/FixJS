function(err, rows) {
                        if (err) {
                            return cb(err);
                        }
                        var ids = rows.reduce(function(prev, item) {
                            prev.push(item.id);
                            return prev;
                        }, []);
                        var errors = [];
                        ids.forEach(function(id) {
                            db.insert('user_groups', {
                                group_id: id,
                                user_id: userId
                            }, function(err) {
                                if (err) errors.push(err);
                                callback(errors.length > 0 ? errors : null, errors.length == 0);
                            });
                        });
                    }