function() {

              mongo.createCollection('links', function(err) {
                if (err) {
                  promiseCreate.reject(err);
                } else {
                  promiseCreate.resolve();
                }
              });
            }