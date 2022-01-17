function(test, assert){
    conn.cql(config['select_counter#cql'], function(err, res){
      assert.ifError(err);
      assert.ok(res.length === 1);
      assert.ok(res[0] instanceof Helenus.Row);
      assert.ok(res[0].get('foo').value === 10);
      test.finish();
    });
  }