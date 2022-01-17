function(err, connection) {
            if (err) {
              promiseOpen.reject(err);
            } else {
              promiseOpen.resolve();
            }
          }