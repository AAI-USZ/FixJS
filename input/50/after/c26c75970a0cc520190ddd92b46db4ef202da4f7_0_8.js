function(err) {
                if (err) {
                  promiseDrop.reject(err);
                } else {
                  promiseDrop.resolve();
                }
              }