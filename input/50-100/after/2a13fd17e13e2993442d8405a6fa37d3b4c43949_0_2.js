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