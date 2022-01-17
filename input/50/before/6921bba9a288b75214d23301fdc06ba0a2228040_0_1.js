function(err, stdout, stderr) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve();
    }