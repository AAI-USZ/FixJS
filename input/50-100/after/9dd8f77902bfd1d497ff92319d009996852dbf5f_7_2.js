function () {
    assert.throws(function () {
      var query = new Query();
      query.select('a', 'b', 'c');
    }, /Invalid select/);
  }