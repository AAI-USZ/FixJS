function thrown (error) {
      if (steps.length && steps.length && ~steps[0].parameters.indexOf("error")) {
        context.error = error;
      } else {
        if (timer) clearTimeout(timer);
        callback(error);
      }
    }