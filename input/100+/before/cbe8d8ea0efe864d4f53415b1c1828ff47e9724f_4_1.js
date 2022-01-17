function(name, permissions, cb) {
            function couples(n) {
                return repeat('(?,?)', ',', n);
            }
            var clause = 'group_id=? AND (service, method) IN (' + 
                couples(permissions.length) + ')';

            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.remove('groups', clause, permissions.reduce(function(prev, item) {
                        prev.push(items.service, item.method);
                        return prev;
                    }, [result.id]), function(err) {
                        return cb(err, !err);
                    });
                }
            });
        }