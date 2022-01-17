function (to, from, functions, must_exists) {
        functions = functions || false;
        must_exists = must_exists || false;

        var ftype = $.typeof(from),
            key;

        switch (ftype) {
        case "string":
        case "number":
        case "array":
        case "boolean":
            return from;
        case "null":
            return null;
        case "function":
            if (!functions) {
                return null; //null?
            }
            return from;
        case "object":
            key = null;
            for (key in from) {
                if (key == "prototype") {
                    continue;
                }
                if (to[key] === undefined) {
                    if (must_exists) {
                        continue;
                    }
                    to[key] = {};
                }
                to[key] = Object._merge(to[key], from[key], functions, must_exists);
            }
            return to;
        }
        return from;
    }