function(err) {
        err = err || {};

        if (!err.message) {
          err.message = 'Database error';
        }

        if (!err.code) {
          err.code = 500;
        }

        // Reject the promise
        promise.reject(err.message, err.code);

        // Log the error
        logging.error(err);
      }