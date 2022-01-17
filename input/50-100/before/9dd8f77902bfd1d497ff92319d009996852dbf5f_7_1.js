function () {
    var query = new Query();
    query.fields({a: 1, b: 1, c: 1});
    query._fields.should.eql({a: 1, b: 1, c: 1});
  }