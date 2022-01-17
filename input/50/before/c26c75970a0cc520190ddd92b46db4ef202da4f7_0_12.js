function() {
          mongo.open(function(err, connection) {
            err ? promiseOpen.reject() : promiseOpen.resolve();
          });
        }