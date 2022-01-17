function () {
        var par = Environment.Environment(false, {
                'a': 3,
                'b': 'shadowed'
            }),
            env = Environment.Environment(par, {
                'b': 'this is shadowing'
            });


        // simple, single environments            
        ok(par.hasBinding('b'), "environments have bindings for symbols:");
        equal('shadowed', par.getBinding('b'), "a binding is a value that can be looked up using a symbol");
        ok(!env.hasOwnBinding('e'), "if an environment doesn't own a binding for a symbol, ...");
        var r = false;
        try {
            env.addBinding('e', 13);
        } catch (e) {
            r = true;
        };
        ok(!r, "then a new binding may be created ...");
        equal(13, env.getBinding('e'), "allowing the symbol to be looked up,");
        ok(env.hasOwnBinding('e'), "and the environment is said to 'own' a binding for that symbol");
        

        // multiple environments
        ok(env.hasOwnBinding('b'), 'if an environment owns a binding, ...');
        ok(env.hasBinding('b'), "then that binding is in the 'top' environment, ...");
        equal('this is shadowing', env.getBinding('b'), 'and any other bindings will be shadowed');
        ok(env.hasBinding('a'), "if there is no shadowing binding, then a binding from a parent can be found ...");
        equal(3, env.getBinding('a'), "and the environment has a binding for that symbol,");
        ok(!env.hasOwnBinding('a'), "although the environment doesn't 'own' that binding, ...");
        var s = false;
        try {
            env.addBinding('a', 'omg');
        } catch(e) {
            s = true;
        };
        ok(!s, "so although adding a shadowing binding later is fine ...");
        equal('omg', env.getBinding('a'), "that will make the parent binding invisible");
        ok(env.hasOwnBinding('a'), " ... and the new binding WILL belong to the environment");

        var t = false;
        try {
            env.addBinding('a', 'this should fail');
        } catch (e) {
            raised = true;
        };
        ok(raised, "an important point: if the environment owns a binding, then you can't add a binding for that symbol");
        equal('omg', env.getBinding('a'), "an exception will be thrown and the binding will be unchanged");

        // can't find if in none env
        ok(!env.hasBinding('c'), "if an environemnt doesn't have a binding for a symbol,");
        ok(!env.hasOwnBinding('c'), "then it also doesn't 'own' a binding ...");
        try {
            equal(false, env.getBinding('c'));
        } catch (e) {
            raised = true;
        };
        ok(raised, "and trying to look up the value of that symbol causes an exception");
    }