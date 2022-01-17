function(error, stdout, stderr) {
        if (error || stderr) {
            deferred.reject(new Error(stderr));
            return;
        }
        deferred.resolve();
    }