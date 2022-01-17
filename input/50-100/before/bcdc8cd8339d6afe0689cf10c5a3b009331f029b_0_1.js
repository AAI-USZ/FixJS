function(def) {
        def = def || exports.DEPTH_INFINITY;
        // If its not set, we'll grab the default
        var depth = this.httpRequest.headers["depth"];
        if (!depth)
            return def;

        if (depth == "infinity")
            return exports.DEPTH_INFINITY;

        // If its an unknown value. we'll grab the default
        if (typeof depth != "number")
            return def;

        return parseInt(depth, 10);
    }