function (path) {
        var lastdot = lastDotIndex(path);
        return fluid.pathUtil.getPathSegment(path, lastdot + 1);
    }