function (err) {
        errors = errors && {errors: errors};
        if(err instanceof Error) { 
          debug('error when executing %s listener', method, err)
          err.message = "Error while executing " + method + " event: " + err.message;
        };
        debug('%s listener complete', method);
        fn(err || errors, item);
      }