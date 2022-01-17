function select(error, results, fields) {
            console.log("Results: " + results);
            if (results !== undefined) {
                if (results.length !== 0) {
                    var now = new Date();
                    if (timeout === 0 || dateDiff(now, results[0]['DateStamp'], 'min') <= timeout) {
                        callback(results[0]['value']);
                    } else {
                        callback(null);
                    }
                } else {
                    callback(null);
                }
            } else {
                callback(null);
            }
        }