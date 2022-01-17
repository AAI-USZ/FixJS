function (path) {
        var lastdot = lastDotIndex(path);
        return lastdot === -1 ? null : path.substring(0, lastdot);
    }