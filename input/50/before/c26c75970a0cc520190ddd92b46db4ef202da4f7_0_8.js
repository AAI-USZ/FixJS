function(err) {
                err ? promiseDrop.reject(err) : promiseDrop.resolve();
              }