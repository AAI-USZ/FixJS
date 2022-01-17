function (to, from, functions, recursive, must_exists) {
        functions = functions || false;
        must_exists = must_exists || false;
        recursive = recursive || false;

        var ret = {},
            ftype,
            key;

        if (recursive === true) {
            ftype = $.typeof(from);

            switch ($.typeof(to)) {
            case "object":
                for (key in to) {
                    if (key != "prototype") {
                        ret[key] = to[key];
                    }
                }
                break;
            case "array":
                ret = Array.clone(ret);
                break;
            }


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
                        ret[key] = {};
                    }
                    ret[key] = Object.merge(to[key], from[key], functions, true, must_exists);
                }
                return ret;
            }
            $.error(arguments);
            throw new Error("add this type[" + ftype + "] to be merged!");
        }
        for (key in to) {
            if (key != "prototype") {
                ret[key] = to[key];
            }
        }

        for (key in from) {
            if (from.hasOwnProperty(key) && key != "prototype") {
                ret[key] = from[key];
            }
        }
        return ret;
    }