function (args, env) {
        var params, body;

        if (!(args instanceof Types.Pair)) {
            return Error.BadMatch(
                "expected $lambda <params> <body>",
                {args: args});
        }

        params = args.left;

        if (args.right === Types.Pair.nil) {
            body = Types.Inert.inert;
        } else {
            body = args.right;
        }

        return new Types.Applicative(new Types.Operative(params, Types.ignore, body, env));
    }