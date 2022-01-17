function thrown (invocation, error) {
      var steps = invocation.arguments[0]
        , next = steps[invocation.index + 1]
        ;
      if (next && /^errors?$/.test(next.parameters[0])) {
        invocation.context.errors.push(error);
      } else {
        if (timer) clearTimeout(timer);
        abended = true;
        callback(error);
      }
    }