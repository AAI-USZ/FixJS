function(err, items) {
              test.ok(err != null);
              test.equal("connection closed", err.message);

              collection.find({}).toArray(function(err, items) {
                test.ok(err != null);
                // console.log("================================================================== 1")
                // console.dir(err)
                // console.dir(items)

                // test.ok(err == null);
                // test.equal(1, items.length);

                collection.find({}).toArray(function(err, items) {
                  // console.log("================================================================== 2")
                  // console.dir(err)
                  // console.dir(items)

                  test.ok(err == null);
                  test.equal(1, items.length);
                  p_db.close();
                  test.done();
                });
              });
            }