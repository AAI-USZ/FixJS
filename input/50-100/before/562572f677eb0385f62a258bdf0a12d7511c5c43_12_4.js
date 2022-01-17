function (expected, actual) {
        if (fluid.isPrimitive(expected)) {
            return expected === actual? 1 : 0;
        } else {
            var stats = {
                matchCount: 0,
                mismatchCount: 0,
                messages: []
            };
            stats.pathOps = fluid.model.makePathStack(expander, "path");
            fluid.deepEquals(expected, actual, stats);
            return stats.matchCount;
        }
    }