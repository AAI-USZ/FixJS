function select(error, results, fields) {
            if (results.length !== 0) {
                callback(results[0]['value']);
            } else {
                callback(null);
            }
        }