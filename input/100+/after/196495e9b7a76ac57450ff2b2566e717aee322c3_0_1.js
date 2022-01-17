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
        , result
        , hold
        , ephemeral = {}
        ;
        

      if (abended) return;

      timeout();

      if (steps[index] && /^errors?$/.test(steps[index].parameters[0]) && !context.errors.length) {
        invoke(steps, index + 1, context, callbacks, callback);
      } else { 
        // No callbacks means that we use the function return value, if any. 
        if (callbacks.length == 1) {
          if (callbacks[0].vargs[0] == invoke) { callbacks[0].vargs.shift() }
        } else {
          callbacks = callbacks.filter(function (result) { return result.vargs[0] !== invoke });
        }

        if (steps.length == index) {
          callback.apply(this, [ null ].concat(callbacks.length == 1 ? callbacks[0].vargs : []));
          return;
        }

        // Get the next step.
        step = steps[index];

        // Filter out the return value, if there are callbacks left, then
        // `contextualize` will process them.
        names = callbacks.length ? contextualize(step, callbacks, context, ephemeral) : [];

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
            if ((arg = ephemeral[parameter]) == void(0)) arg = methods[parameter];
          }
          args.push(arg);
        });

        cadences.length = 0;
        names.forEach(function (name) { if (name[0] == "$") delete context[name] });
        context.errors = [];

        try {
          hold = cadence();
          result = step.apply(this, args);
          hold.apply(this, [ null, invoke ].concat(result == void(0) ? [] : [ result ]));
        } catch (error) {
          thrown(invocation, error);
          invoke.apply(this, invocation.arguments);
        }
      }
    }