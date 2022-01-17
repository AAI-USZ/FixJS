function (obj, recursive) {
        recursive = recursive || true;

        var i,
            clone,
            cloned,
            key;

        switch ($.typeof(obj)) {
        case "string":
            return obj.substring();
        case "array":
            i = obj.length;
            if (i === 0) {
                return [];
            }

            clone = new Array(i);
            while (i--) {
                if (recursive) {
                    clone[i] = $.clone(obj[i], recursive);
                } else {
                    clone[i] = obj[i];
                }
            }
            return clone;
        case "null":
            return null;
        case "number":
            return 0 + obj;
        case "boolean":
            return obj ? true : false;
        case "object":

            cloned = {};
            key = null;
            for (key in obj) {
                if (recursive) {
                    cloned[key] = $.clone(obj[key], recursive);
                } else {
                    cloned[key] = obj[key];
                }
            }

            return cloned;
        case "function":
            return obj;
        case "regexp":
            return new RegExp(obj.source);
        default:
            throw new Error("type[" + $.typeof(obj) + "] cannot be cloned");
        }
    }