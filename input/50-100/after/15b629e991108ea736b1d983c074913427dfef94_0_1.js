function require(arg1, arg2, arg3, arg4) {
        var args = parse(arg1, arg2, arg3, arg4),
            config = extend({}, defaults, args.config);

        ready(config, args.path || lookup(config, "baseUrl"), args.dependencies, args.closure);

        return makeRequire(args.config);
    }