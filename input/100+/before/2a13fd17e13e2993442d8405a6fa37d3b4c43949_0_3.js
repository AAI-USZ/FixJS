function evaluateAtom(sexpr, env) {
        if (sexpr.type === 'symbol') {
            if (env.hasBinding(sexpr.value)) { // uh ... has own property?
                return env.getBinding(sexpr.value);
            } else {
                throw new Error("could not find symbol " + sexpr.value);
            }
        }

        if (sexpr.type === 'number' || sexpr.type === 'string' || sexpr.type === 'boolean') {
            return sexpr;
        }

        throw new Error("unrecognized type: " + sexpr.type + " in " + JSON.stringify(sexpr));
    }