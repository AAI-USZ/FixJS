function(path) {
        return typeof(path) === "string" && path.indexOf("*") !== -1;
    }