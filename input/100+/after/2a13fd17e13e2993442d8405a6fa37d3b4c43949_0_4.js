function (Data, Functions, Environment) {
    "use strict";

    //////// Special forms

    function define(env, args) {
        if (args.length !== 2) {
        	throw new Error("define needs 2 arguments, got " + args.length);
        }

        var name = args[0], 
    	    sexpr = args[1];

        if (name.type !== "symbol") {
            throw new Error("define needs a symbol as its first argument (got " + name.type + ")");
        }
        
        var value = evaluate(sexpr, env);
        env.addBinding(name.value, value);
        return Data.Nil();
    }


    function myif(env, args) {
    	if(args.length !== 3) {
    		throw new Error("if needs 3 arguments, got " + args.length);
    	}
    	
    	var condition = args[0], 
    	    ifTrue = args[1],
    	    ifFalse = args[2],
            cond = evaluate(condition, env);

        if (cond.type !== 'boolean') {
            throw new Error("if needs a boolean as first argument");
        }

        if (cond.value) {
            return evaluate(ifTrue, env);
        }

        return evaluate(ifFalse, env);
    }


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


    ///////////

    function getDefaultEnv() {
        var bindings = {},
            funcNames = ['cons', 'car', 'cdr', 'list', '=', '+', 'neg'];

        funcNames.map(function (name) {
            bindings[name] = Data.Function(Functions[name]);
        });

        bindings['define'] = Data.SpecialForm(define);
        bindings['if']     = Data.SpecialForm(myif);
        bindings['lambda'] = Data.SpecialForm(lambda);

        bindings['true']  = Data.Boolean(true);
        bindings['false'] = Data.Boolean(false);

        return Environment.Environment(null, bindings);
    }

    ////////////
    
    
    function applyFunction(func, env, args) {
        var evaledArgs = args.map(function (arg) {
            return evaluate(arg, env);
        });

        return func(evaledArgs);
    }
    
    
    function applySpecial(func, env, args) {
    	return func(env, args);
    }


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


    function evaluateAtom(sexpr, env) {
        if (sexpr.type === 'symbol') {
            return env.getBinding(sexpr.value);
        }

        if (sexpr.type === 'number' || sexpr.type === 'string' || sexpr.type === 'boolean') {
            return sexpr;
        }

        throw new Error("unrecognized type: " + sexpr.type + " in " + JSON.stringify(sexpr));
    }


    function evaluate(sexpr, env) {
        if (!env || !sexpr) {
            throw new Error("evaluate missing sexpr or environment");
        }

        if (sexpr.type === 'list') {
            return evaluateList(sexpr, env);
        }

        return evaluateAtom(sexpr, env);
    }



    return {
        'eval': evaluate,
        'getDefaultEnv': getDefaultEnv,
        'define': define
    };

}