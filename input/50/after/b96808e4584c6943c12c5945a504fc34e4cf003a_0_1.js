function (path) {
        var lastdot = lastDotIndex(path);
        return lastdot === -1 ? "" : path.substring(0, lastdot);
    }