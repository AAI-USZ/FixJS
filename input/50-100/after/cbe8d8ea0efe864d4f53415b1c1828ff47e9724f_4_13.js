function(err, ids) {
                        if (err) {
                            return cb(err, null, false);
                        }
                        var links = ids.reduce(function(prev, item) {
                            prev.push({
                                group_id: item.id,
                                user_id: gid
                            });
                            return prev;
                        }, []);
                        db.insertAll('user_groups', links, function(err) {
                            cb(err, !err, false);
                        });
                }