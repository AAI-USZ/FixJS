function(err, _result1) {

                          db1.admin().logout(function(err, _result2) {

                            db2.admin().logout(function(err, _result3) {
                              test.equal(true, _result1);
                              test.equal(true, _result2);
                              test.equal(true, _result3);

                              var col1 = db1.collection('stuff');
                              var col2 = db2.collection('stuff');

                              col1.insert({a:2}, {safe:{j:true}}, function(err1, result) {

                                col2.insert({a:2}, {safe:{j:true}}, function(err2, result) {
                                  test.ok(err1 != null);
                                  test.ok(err2 != null);

                                  db1.authenticate('user1', 'secret', function(err, result1) {

                                    db2.authenticate('user2', 'secret', function(err, result2) {
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
                                    });
                                  });
                                })
                              })
                            })
                          });
                        }