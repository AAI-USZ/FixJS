function hdVariableProxy(value) {
      if (arguments.length > 0) {
        LOG("edited " + vv + ": " + JSON.stringify(value));
        /* Setting a variable with its current value should still touch it. We
         * will check for identity assignments later. Multiple assignments to the
         * same variable are reduced to one (the latest) so that we do not call
         * set() more than once. */
        vv.set(value);
        runtime.maybeTouch(vv);
      } else {
        return evaluator.get(vv);
      }
    }