function() {
          // Insert each of the links
          for (; i < len; i++) {
            promises[i] = db.insertLink(fixtures[i]);
          }

          promises[len] = new p.Promise();

          mongo.open(function(err, connection) {
            if (err) {
              promises[len].reject(err);
            } else {
              promises[len].resolve(connection);
            }
          });

          p.Promise.when(promises).then(spy, notCalled);
        }