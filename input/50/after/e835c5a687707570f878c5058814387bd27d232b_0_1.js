function(arg) {
            var bnd = {};
            bnd[expr[1]] = arg;
            var new_env = {
                bindings: bnd,
                outer: env
            };
            return evalScheem(expr[2], new_env);
        }