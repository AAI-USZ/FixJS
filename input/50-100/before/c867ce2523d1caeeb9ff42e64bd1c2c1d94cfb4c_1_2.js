function (err) {
      if(err instanceof Error) {
        err.message = "Error while executing " + method + " event: " + err.message;
        debug('error when executing %s listener', method, err);
      } 
      fn(err || errors, item);
    }