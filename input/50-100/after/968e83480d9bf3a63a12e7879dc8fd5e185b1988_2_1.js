function(err) {
        err = err || {};

        err.message = err.message || 'Database error';
        err.code = err.code || 500;

        // Reject the promise
        promise.reject(err.message, err.code);

        // Log the error
        logging.error(err);
      }