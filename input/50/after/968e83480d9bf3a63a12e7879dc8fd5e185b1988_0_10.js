function() {
        return helper.rejectAPromise({
          message: message,
          error: error,
          code: 404
        });
      }