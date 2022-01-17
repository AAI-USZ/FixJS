function (callback) {
        if(_key === undefined) {
            callback(new Error("Please provide an API key via setKey."));
        } else {
            callback(null);
        }
    }