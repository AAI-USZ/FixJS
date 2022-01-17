function (args, env) {
        var parts = Types.util.gatherArguments(args._expand(env), ["expression", "environment"], true);

        expectEnvironment(parts.environment, args, env);

        // eval the env to get it, don't eval the expression in this env
        return parts.expression.eval_(parts.environment);
    }