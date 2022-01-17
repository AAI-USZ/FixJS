function () {
    var query = new Query();
    query.select("a b -c");
    query._fields.should.eql({a: 1, b: 1, c: 0});
  }