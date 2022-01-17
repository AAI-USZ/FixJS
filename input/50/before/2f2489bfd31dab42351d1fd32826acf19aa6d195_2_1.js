function() {
        var cb = arguments[arguments.length - 1];
        calledWith = arguments;

        cb(null, model);
      }