function(arg)  {
            var bnd = {};
            bnd[expr[1]] = arg;
            var newenv = {
                bindings: bnd,
                outer: env
            };
            return evalScheem(expr[2], newenv);
        }