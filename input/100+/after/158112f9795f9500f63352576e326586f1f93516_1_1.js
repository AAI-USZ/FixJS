function (assert) {
  async.series(
    [ function(cb) { nano.db.create("db_replicate", cb); }
    , function(cb) { nano.db.create("db_replica", cb);   }
    , function(cb) { nano.db.create("db_replica2", cb);  }
    ]
  , function(error, results) {
    assert.equal(error, undefined, "Should have created databases");
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