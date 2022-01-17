function (path, args, root) {
        var fn = flock.get(path, root);
        if (typeof (fn) !== "function") {
            throw new Error("Path '" + path + "' does not resolve to a function.");
        }
        return fn.apply(null, args);
    }