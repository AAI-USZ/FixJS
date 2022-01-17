function(err, result) {
                if (err) {
                    cb(err);
                } else if (!result) {
                    cb(null, false);
                } else {
                    db.select('permissions', null, ['service', 'method'], 
                        'group_id=?', [result.id], cb);
                }
            }