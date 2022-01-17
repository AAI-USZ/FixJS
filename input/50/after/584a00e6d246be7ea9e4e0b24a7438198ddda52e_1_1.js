function (root, segment, path) {
            var existing = fluid.get(source, path, getConfig);
            return fluid.isArrayable(existing) ? "array" : "object";
        }