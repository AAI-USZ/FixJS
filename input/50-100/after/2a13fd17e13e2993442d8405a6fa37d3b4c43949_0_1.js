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