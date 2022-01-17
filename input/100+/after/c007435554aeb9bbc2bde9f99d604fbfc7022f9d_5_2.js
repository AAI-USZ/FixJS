function(node) {
            // Ok let's execute same query a couple of times
            collection.find({}).toArray(function(err, items) {
              test.ok(err != null);
              test.equal("connection closed", err.message);

              collection.find({}).toArray(function(err, items) {
                test.ok(err != null);

                collection.find({}).toArray(function(err, items) {
                  test.ok(err == null);
                  test.equal(1, items.length);

                  db.close(function() {
                    test.done();
                  });
                });
              });
            });
          }