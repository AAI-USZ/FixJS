function define(env, name, sexpr) {
        if (name.type !== "symbol") {
            throw new Error("define needs a symbol as its first argument (got " + name.type + ")");
        }
        var value = evaluate(sexpr, env);
        env.addBinding(name.value, value);
        return Data.Nil();
    }