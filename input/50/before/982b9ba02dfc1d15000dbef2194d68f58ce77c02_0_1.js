function (callback) {
        if(_deployment === undefined) {
            callback(new Error("Please provide the URL of the S3DB deployment via setDeployment."));
        }
    }