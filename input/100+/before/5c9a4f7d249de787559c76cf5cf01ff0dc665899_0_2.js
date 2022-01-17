function evaluateAtom(sexpr, env) {
    	var type = sexpr.type;
    	
        if (type === 'symbol') {
            return env.getBinding(sexpr.value);
        }

        if (type === 'number' || type === 'string' || type === 'boolean' || type === 'function') {
            return sexpr;
        }

        throw new Error("unrecognized type: " + sexpr.type + " in " + JSON.stringify(sexpr));
    }