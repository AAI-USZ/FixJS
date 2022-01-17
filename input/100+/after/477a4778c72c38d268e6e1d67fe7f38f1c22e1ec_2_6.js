function (flatSchema) {
        var keys = fluid.model.sortByKeyLength(flatSchema);
        return function (root, segment, path) {
          // TODO: clearly this implementation could be much more efficient
            for (var i = 0; i < keys.length; ++ i) {
                var key = keys[i];
                if (fluid.pathUtil.matchPath(key, path, true) !== null) {
                    return flatSchema[key];
                }
            }
        };
    }