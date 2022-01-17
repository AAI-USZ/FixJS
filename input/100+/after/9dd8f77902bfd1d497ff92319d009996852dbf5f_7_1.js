function () {
    var query = new Query();
    query.select('a');
    query._fields.should.eql({a: 1});
    query.select('b');
    query._fields.should.eql({a: 1, b: 1});
    query.select({ c: 0 })
    query._fields.should.eql({a: 1, b: 1, c: 0});
    query.select('-d')
    query._fields.should.eql({a: 1, b: 1, c: 0, d: 0});
  }