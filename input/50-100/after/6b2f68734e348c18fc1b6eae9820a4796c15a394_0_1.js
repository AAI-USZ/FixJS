function thrown (error) {
      if (steps.length && steps.length && ~steps[0].parameters.indexOf("error")) {
        context.error = error;
      }
      abended = true;
      if (timer) clearTimeout(timer);
      callback(error);
    }