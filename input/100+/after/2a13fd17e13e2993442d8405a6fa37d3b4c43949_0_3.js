function evaluateAtom(sexpr, env) {
        if (sexpr.type === 'symbol') {
            return env.getBinding(sexpr.value);
        }

        if (sexpr.type === 'number' || sexpr.type === 'string' || sexpr.type === 'boolean') {
            return sexpr;
        }

        throw new Error("unrecognized type: " + sexpr.type + " in " + JSON.stringify(sexpr));
    }