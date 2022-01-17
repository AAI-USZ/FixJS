function () {
    var query = new Query();
    query.in('age', [21, 25, 30]);
    query._conditions.should.eql({age: {$in: [21, 25, 30]}});
  }