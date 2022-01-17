function(err, result) {
                console.log(result);
                if (err) {
                    return cb(err, null, false);
                }
                cb(null, !!result, false);
            }