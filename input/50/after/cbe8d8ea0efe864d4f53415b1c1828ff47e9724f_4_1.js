function(err, result) {
                    if (err) {
                        cb(err, null, false);
                    } else {
                        cb(err, !!result, false);
                    }
                }