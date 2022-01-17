function(err, items) {
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 2")
                test.ok(err != null);

                collection.find({}).toArray(function(err, items) {
                  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 3")
                  test.ok(err == null);
                  test.equal(1, items.length);
                  console.log("================================== dbCLOSE")
                  db.close(function() {
                    test.done();
                  });
                });
              }