function evaluateList(sexpr, env) {
        if (!sexpr.value[0]) {
            throw new Error("cannot evaluate empty list");
        }

        var first = evaluate(sexpr.value[0], env),
            args = sexpr.value.slice(1),
            func = first.value;

        if (first.type === 'function') {
            return applyFunction(func, env, args);
        }

        if (first.type === 'specialform') {
            return applySpecial(func, env, args);
        }

        throw new Error("first element in list must be function or special form (was " + first.type + ")");
    }