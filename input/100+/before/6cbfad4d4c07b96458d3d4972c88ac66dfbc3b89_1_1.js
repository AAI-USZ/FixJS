function (arg, argType, errorObj) {
        var invalidArg = false;

        switch (argType) {
        case "array":
            if (!arg instanceof Array) {
                invalidArg = true;
            }
            break;
        case "date":
            if (!arg instanceof Date) {
                invalidArg = true;
            }
            break;
        case "integer":
            if (typeof arg === "number") {
                if (arg !== Math.floor(arg)) {
                    invalidArg = true;
                }
            }
            else {
                invalidArg = true;
            }
            break;
        default:
            if (typeof arg !== argType) {
                invalidArg = true;
            }
            break;
        }

        if (invalidArg) {
            throw errorObj;
        }
    }