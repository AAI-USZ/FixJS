function invoke (steps, index, context, callbacks, callback) {
      var arg
        , args = []
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

      if (abended) return;

      timeout();

      if (steps.length == index) {
        callback(null);
        return;
      }

      // Get the next step.
      step = steps[index];

      // No callbacks means that we use the function return value as the value
      // for the context, TODO but only if the value is not `undefined`. Here
      // we're doing the thing where we use an object, so maybe we need to
      // rethink this...
      if (callbacks.length == 1 && typeof callbacks[0].vargs[1] == "object") {
        extend(stack[0].context, callbacks[0].vargs[1]);
      }

      // Filter out the return value, if there are callbacks left, then
      // `contextualize` will process them.
      callbacks = callbacks.filter(function (result) { return result.vargs[0] !== invoke });
      names = callbacks.length ? contextualize(step, callbacks, context) : [];

      // Give our creator a chance to inspect the step, possibly wrap it.
      Object.keys(options.wrap || {})
        .filter(function (name) { return named(step, name) && name })
        .map(function (name) { return options.wrap[name] })
        .forEach(function (wrapper) {
          var parameters = step.parameters, original = step.original || step;
          step = wrapper(step)
          step.parameters = parameters;
          step.original = original;
        });

      if (/^errors?$/.test(step.parameters[0]) && !context.errors.length) {
        invoke(steps, index + 1, context, [], callback);
      } else { 
        invocation = { callbacks: [], count: 0 , called: 0, context: context, index: index, callback: callback };
        invocation.arguments = [ steps, index + 1, context, invocation.callbacks, callback ]

        step.parameters.forEach(function (parameter) {
          if (parameter == options.alias) {
            parameter = 'cadence';
          }
          if (parameter == "error") {
            arg = context.errors[0];
          // Did not know that `/^_|callback$/` means `^_` or `done$`.
          } else if (/^(_|callback)$/.test(parameter)) {
            arg = cadence();
          } else if ((arg  = context[parameter]) == void(0)) {
            arg = methods[parameter];
          }
          args.push(arg);
        });

        cadences.length = 0;
        names.forEach(function (name) { if (name[0] == "$") delete context[name] });
        context.errors = [];

        try {
          cadence()(null, invoke, step.apply(this, args));
        } catch (error) {
          thrown(invocation, error);
          invoke.apply(this, invocation.arguments);
        }
      }
    }