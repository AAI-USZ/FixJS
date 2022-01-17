function(err, result) {
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
                                                  }