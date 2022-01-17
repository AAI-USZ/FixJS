function (prefix, suffix) {
        return !prefix ? suffix : (!suffix ? prefix : 
            prefix + "." + suffix);
    }