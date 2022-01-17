function(err, result) {
                console.log(result);
                if (err) {
                    return cb(err);
                }
                cb(null, !!result);
            }