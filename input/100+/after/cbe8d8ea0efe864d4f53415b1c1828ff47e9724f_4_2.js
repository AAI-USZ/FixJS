function(err, rows) {
                        if (err) {
                            return cb(err, null, false);
                        }
                        var links = rows.reduce(function(prev, item) {
                            prev.push({
                                group_id: item.id,
                                user_id: userId
                            });
                            return prev;
                        }, []);
                        db.insertAll('user_groups', links, function(err) {
                            cb(err, !err, false);
                        });
                    }