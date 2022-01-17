function() {

              var links = mongo.collection('links');
              links.drop(function(err) {
                err ? promiseDrop.reject(err) : promiseDrop.resolve();
              })
            }