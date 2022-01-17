function (prefix, suffix) {
        prefix = prefix || "";
        suffix = suffix || "";
        return !prefix ? suffix : (!suffix ? prefix : prefix + "." + suffix);
    }