function(name, permissions, cb) {
            function couples(n) {
                return repeat('(service=? AND method=?)', ' OR ', n);
            }
            var clause = 'group_id=? AND (' + 
                couples(permissions.length) + ')';

            this._getGroupId(name, function(err, result) {
                if (err) {
                    cb(err, null, false);
                } else if (!result) {
                    cb(null, false, false);
                } else {
                    db.remove('permissions', clause, permissions.reduce(function(prev, item) {
                        prev.push(item.service, item.method);
                        return prev;
                    }, [result.id]), function(err) {
                        return cb(err, !err, false);
                    });
                }
            });
        }