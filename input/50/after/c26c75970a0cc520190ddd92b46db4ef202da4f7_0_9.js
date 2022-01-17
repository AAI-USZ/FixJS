function() {

              var links = mongo.collection('links');
              links.drop(function(err) {
                if (err) {
                  promiseDrop.reject(err);
                } else {
                  promiseDrop.resolve();
                }
              });
            }