function(err, result) {
                if (err) {
                    return cb(err);
                }
                cb(null, !!result);
            }