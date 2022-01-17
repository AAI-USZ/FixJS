function specialapply(f, env, args) {
        return f.apply(null, [env].concat(args));
    }