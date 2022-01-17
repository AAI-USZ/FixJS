function(test, assert, err, res){
      assert.ok(res.length === 1);
      assert.ok(res[0] instanceof Helenus.Row);
      assert.ok(res[0].get('cnt').value === 10);
  }