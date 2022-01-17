function (thisArg, funargs) {
        var
            thisobj = this,
            args = funargs[0],
            cc = funargs[1],
            dynamicEnv = cc.env,
            value;

        if (args instanceof Pair.Nil) {
            // with no args it evaluates to itself
            return cc.resolve(this);
        } else if (args.left instanceof Symbol) {
            // with one or more it evals the left one and tries to find the
            // symbol in the object and returns that attr
            value = thisobj.attrs[args.left.value];

            if (value === undefined) {
                // TODO: throw an error?
                return cc.resolve(obj.inert);
            } else if (args.right instanceof Pair.Nil) {
                // if no more args, resolve to the attr
                return cc.resolve(value);
            } else {
                // if more args apply the attribute to the rest
                // of the arguments
                return value.apply(thisArg, [args.right, cc]);
            }
        } else {
            return Error.BadMatch(
                "expected symbl in argument list",
                {args: args, got: args.left});
        }
    }