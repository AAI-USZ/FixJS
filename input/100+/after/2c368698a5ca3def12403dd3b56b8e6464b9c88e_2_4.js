function(err, result2) {
                                      test.ok(result1);
                                      test.ok(result2);

                                      col1.insert({a:2}, {safe:{j:true}}, function(err1, result) {

                                        col2.insert({a:2}, {safe:{j:true}}, function(err2, result) {
                                          test.equal(null, err1);
                                          test.equal(null, err2);

                                          serverManager = new ServerManager({auth:true, purgedirectories:false})
                                          serverManager.start(true, function(err, result) {

                                            col1.find({}).toArray(function(err, items) {
                                              test.ok(err == null);
                                              test.equal(1, items.length);

                                              col1.insert({a:2}, {safe:{j:true}}, function(err1, result) {
                                                col2.insert({a:2}, {safe:{j:true}}, function(err2, result) {
                                                  db1.logout(function(err, result) {
                                                    test.ok(err == null);
                                                    test.ok(result);

                                                    col1.insert({a:2}, {safe:{j:true}}, function(err, result) {
                                                      test.ok(err != null);

                                                      db2.logout(function(err, result) {
                                                        test.ok(err == null);
                                                        test.ok(result);

                                                        col2.insert({a:2}, {safe:{j:true}}, function(err, result) {
                                                          test.ok(err != null);

                                                          test.done();
                                                          db1.close();
                                                          db2.close();
                                                          admin.close();
                                                        });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            })
                                          });
                                        });
                                      });
                                    }