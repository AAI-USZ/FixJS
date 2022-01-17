function(test, assert){
    var select = "SELECT foo FROM cql_test WHERE KEY='?'";

    conn.cql(select, ["'foobar"], function(err, res){
      assert.ifError(err);
      assert.ok(res.length === 1);
      assert.ok(res[0] instanceof Helenus.Row);
      assert.ok(res[0].key === "'foobar");
      assert.ok(res[0].count === 0);
      test.finish();
    });
  }