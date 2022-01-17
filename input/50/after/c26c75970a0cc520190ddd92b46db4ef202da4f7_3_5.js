function(err, result) {

      if (err) {
        debugger;

        // Database error
        promise.reject({
          message: 'Database error inserting into links database',
          error: err,
          code: 500
        });

      } else {
        promise.resolve(true);
      }
    }