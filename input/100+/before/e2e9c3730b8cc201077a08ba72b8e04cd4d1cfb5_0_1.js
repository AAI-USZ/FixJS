function (err, results) {
                    if (err) {
                        return ret.errback(err);
                    } else {
                        return ret.callback(results.rows, results);
                    }
                }