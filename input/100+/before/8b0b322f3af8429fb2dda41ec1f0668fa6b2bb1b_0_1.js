function invoke () {
      var arg
        , args = []
        , done = false
        , match
        , parameter, parameters
        , i, I
        , calledback
        , step, key, next
        , leaked
        , result
        , value
        , names
        ;

      timeout();

      while (cadences.length) {
        steps.unshift(cadences.pop());
      }

      if (!steps.length) {
        callback(null);
        return;
      }

      callbacks = callbacks.filter(function (result) { return result.vargs[0] !== cadence });

      step = steps.shift();

      names = callbacks.length ? contextualize(step) : [];

      Object.keys(options.wrappers || {})
        .filter(function (name) { return named(step, name) && name })
        .map(function (name) { return options.wrappers[name] })
        .forEach(function (wrapper) {
          var parameters = step.parameters;
          step = wrapper(step)
          step.parameters = parameters;
        });

      step.parameters.forEach(function (parameter) {
        // Did not know that `/^_|done$/` means `^_` or `done$`.
        done = /^(_|done)$/.test(parameter);
        if (done) {
          arg = callback();
        } else {
          arg = context[parameter];
          if (arg == null) {
            arg = methods[parameter];
          }
        }
        args.push(arg);
      });
      delete context.error;
      names.forEach(function (name) { if (name[0] == "$") delete context[name] });
      callbacks = [];
      count = called = 0;
      next = cadence();
      try {
        result = step.apply(this, args);
        if (count == 1) {
          if (typeof result == "object") {
            for (var key in result) if (result.hasOwnProperty(key)) context[key] = result[key];
          }
        }
        next(null, cadence);
      } catch (error) {
        thrown(error);
        invoke();
      }
    }