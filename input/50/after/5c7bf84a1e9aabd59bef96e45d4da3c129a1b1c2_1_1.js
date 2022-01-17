function (err) {
        if (!err.reported) {
            throw err;
        }
    }