function(err, items) {
                  test.ok(err == null);
                  test.equal(1, items.length);

                  db.close(function() {
                    test.done();
                  });
                }