function (items, names, exactNumber, defaults) {
        var param, paramName, arg, argValue, args, iargs, params, iparams, bindings = {};

        defaults = defaults || {};

        if (Util.isArray(items)) {
            iargs = args = obj.util.arrayToPair(items);
        } else {
            iargs = args = items;
        }

        if (Util.isArray(names)) {
            iparams = params = obj.util.arrayToPair(names, true);
        } else if (names instanceof Symbol) {
            // NOTE if names is a symbol then bind all args to that symbol
            // and return
            bindings[names.value] = args;
            return bindings;
        } else {
            iparams = params = names;
        }

        while (iparams !== Pair.nil) {
            param = iparams.left;

            if (param instanceof Symbol) {
                paramName = param.value;
            } else if (typeof param === "string") {
                paramName = param;
            } else {
                return Error.BadMatch(
                    "expected identifier in argument list",
                    {params: params, args: args, got: param});
            }

            arg = iargs.left;

            if (iargs === Pair.nil) {
                if (defaults[paramName] === undefined) {
                    return Error.BadMatch(
                        "less parameters provided than required",
                        {params: params, args: args});
                } else {
                    argValue = defaults[paramName];
                }
            } else {
                argValue = arg;
            }

            bindings[paramName] = argValue;


            if (obj.util.isListOrNil(iparams.right)) {
                iparams = iparams.right;
            } else if (iparams.right instanceof Symbol) {
                bindings[iparams.right.value] = iargs.right;
                iparams = Pair.nil;
            } else if (typeof iparams.right === "string") {
                bindings[iparams.right] = iargs.right;
                iparams = Pair.nil;
            }

            iargs = iargs.right;
        }

        if (exactNumber && iargs !== Pair.nil) {
            return Error.BadMatch(
                "more parameters provided than required",
                {params: params, args: args});
        }

        return bindings;
    }