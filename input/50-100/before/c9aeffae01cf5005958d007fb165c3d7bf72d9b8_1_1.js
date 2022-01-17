function thrown (error, steps, index, context, callbacks, callback) {
      if (steps.length && steps.length && ~steps[0].parameters.indexOf("error")) {
        context.error = error;
      }
      abended = true;
      if (timer) clearTimeout(timer);
      callback(error);
    }