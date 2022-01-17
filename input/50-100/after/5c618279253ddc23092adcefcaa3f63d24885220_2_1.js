function(test, assert){
    conn.cql(config['incr#cql'], function(err, res){
      assert.ifError(err);
      assert.ok(res === undefined);
      test.finish();
    });
  }