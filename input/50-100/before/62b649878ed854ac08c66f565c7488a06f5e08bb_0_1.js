function (args, env) {
        var parts = Types.util.gatherArguments(args, ["expression", "environment"], true),
            evalEnv = parts.environment.eval_(env);

        expectEnvironment(evalEnv, args, env);

        // eval the env to get it, don't eval the expression in this env
        return parts.expression.eval_(evalEnv);
    }