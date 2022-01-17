function(err, uuids) {
            if (err) {
                return callback(err);
            } else {
                callback(err, uuids.toString());
            }
        }