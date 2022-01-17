function (err) {
        if(err instanceof Error) { 
          debug('error when executing %s listener', method, err)
          err.message = "Error while executing " + method + " event: " + err.message;
        };
        fn(err || errors, item);
      }