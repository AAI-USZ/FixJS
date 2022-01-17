function () {
        var path = "";
        for (var i = 0; i < arguments.length; ++i) {
            path = fluid.pathUtil.composePath(path, arguments[i]);
        }
        return path;
    }