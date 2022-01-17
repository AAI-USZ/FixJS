function lambda(env, lam_args) {
    	if(lam_args.length !== 2) {
    		throw new Error("lambda constructor requires 2 arguments, got " + lam_args.length);
    	}
    	
    	var args = lam_args[0],
    	    body = lam_args[1];
    	
        if (args.type !== 'list') {
            throw new Error("lambda requires a list as first argument");
        }

        var names = [],
            i, sym;

        // get the list of arguments
        for (i = 0; i < args.value.length; i++) {
            sym = args.value[i];
            if (sym.type !== 'symbol') {
                throw new Error("all parameter names in lambda must be symbols");
            }
            names.push(sym);
        }

        // create the closure,
        //   which stores a reference to the environment,
        //   and when evaluated, creates a new environment
        //   and puts its arguments in the environment
        //   then it evaluates its body in the new environment
        function closure(c_args) {
            var ln = names.length,
                la = c_args.length,
                newEnv = Environment.Environment(env, {});

            if (ln !== la) {
                throw new Error("length of parameter list of lambda does not match arguments list: " + ln + " vs " + la);
            }

            for (var j = 0; j < names.length; j++) {
                // arguments already evaluated
                newEnv.addBinding(names[j].value, c_args[j]);
            }

            return evaluate(body, newEnv);
        }

        // could create a new data type (closure) later if desired
        return Data.Function(closure);
    }