function (error, canonicalPath) {
        if (error) {
            error.message = "Can't get canonical path of " + JSON.stringify(path) + " by way of C realpath: " + error.message;
            result.reject(error);
        } else {
            result.resolve(canonicalPath);
        }
    }