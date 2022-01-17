function () {
        var segments = fluid.makeArray(arguments),
            path = "";
        for (var i = 0; i < segments.length; ++i) {
            path = fluid.pathUtil.composePath(path, segments[i]);
        }
        return path;
    }