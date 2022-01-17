function() {
      var def = Evaluate.define,
          par = Environment.Environment(false, {'a': 3}),
          env = Environment.Environment(par, {'b': 4}),
          raised = false;
      
      try {
        def(env, Data.Symbol('b'), Data.Number(13));
      } catch(e) {
        raised = true;
      };
      ok(raised, "can't change binding");
      equal(4, env.getBinding('b'));
      
      def(env, Data.Symbol('c'), Data.String("derr"));
      deepEqual(Data.String("derr"), env.getBinding('c'));
      ok(env.hasOwnBinding('c'));
      ok(!par.hasBinding('c'));
    }