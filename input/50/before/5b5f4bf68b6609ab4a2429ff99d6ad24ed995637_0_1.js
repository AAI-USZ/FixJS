function (err, results) {
        if (err)
        {
            console.log("error occured deleting all nodes :" + err);
            return callback(err);
        }
        callback(null, results);
    }