function (err) {
    assert.equal(err, undefined, "Failed to create database");
     nano.db.create("db_replica", function (err) {
       assert.equal(err, undefined, "Failed to create replica database");
       async.parallel(
         [ function(cb) { db.insert({"foo": "bar"}, "foobar", cb); }
         , function(cb) { db.insert({"bar": "foo"}, "barfoo", cb); }
         , function(cb) { db.insert({"foo": "baz"}, "foobaz", cb); }
         ]
       , function(error, results){
         assert.equal(error, undefined, "Should have stored docs");
       });
     });
  }