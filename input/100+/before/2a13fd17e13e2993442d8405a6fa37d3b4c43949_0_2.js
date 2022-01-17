function evaluateList(sexpr, env) {
        // what if it's empty?
        if (!sexpr.value[0]) {
            throw new Error("cannot evaluate empty list");
        }

        var first = evaluate(sexpr.value[0], env),
            args = sexpr.value.slice(1),
            func = first.value,
            evaledArgs;

        if (first.type === 'function') {

            evaledArgs = args.map(function (a) {
                return evaluate(a, env);
            });

            return myapply(func, evaledArgs);
        }

        if (first.type === 'specialform') {
            return specialapply(func, env, args);
        }

        throw new Error("first element in list must be function or special form (was " + first.type + ")");
    }