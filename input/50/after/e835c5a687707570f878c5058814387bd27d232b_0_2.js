function (env, v, val) {
    if (!(env.hasOwnProperty('bindings'))) { // empty env
        env.bindings = {};
        env.outer = {};
    }
    env.bindings[v] = val;
}