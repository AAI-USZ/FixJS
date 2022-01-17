function require(arg1, arg2, arg3, arg4) {
        var args = parse(arg1, arg2, arg3, arg4);

        ready(extend({}, defaults, args.config), args.path || lookup(args.config, "baseUrl"), args.dependencies, args.closure);

        return makeRequire(args.config);
    }