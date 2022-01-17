function (root, segment, path) {
            var existing = fluid.get(source, path);
            return fluid.isArrayable(existing) ? "array" : "object";
        }