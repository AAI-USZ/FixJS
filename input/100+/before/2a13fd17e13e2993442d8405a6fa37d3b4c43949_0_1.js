function lambda(env, args, body) {
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
        function closure() {
            var ln = names.length,
                la = arguments.length,
                newEnv = Environment.Environment(env, {});

            if (ln !== la) {
                throw new Error("length of parameter list of lambda does not match arguments list: " + ln + " vs " + la);
            }

            for (var j = 0; j < names.length; j++) {
                // arguments already evaluated
                newEnv.addBinding(names[j].value, arguments[j]);
            }

            return evaluate(body, newEnv);
        }

        // could create a new data type (closure) later if desired
        return Data.Function(closure);
    }