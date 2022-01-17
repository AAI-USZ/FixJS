function thrown (invocation, error) {
      var steps = invocation.arguments[0]
        , next = steps[invocation.index + 1]
        ;
      if (next && ~next.parameters.indexOf("error")) {
        invocation.context.error = error;
      } else {
        if (timer) clearTimeout(timer);
        abended = true;
        callback(error);
      }
    }