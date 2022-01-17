function(test, assert){
    conn.cql(config['update#cql'], function(err, res){
      assert.ifError(err);
      assert.ok(res === undefined);
      test.finish();
    });
  }