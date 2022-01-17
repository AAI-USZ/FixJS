function () {
    var query = new Query();
    query.where('age').notEqualTo(21);
    query._conditions.should.eql({age: {$ne: 21}});

    query = new Query();
    query.notEqualTo('age', 21);
    query._conditions.should.eql({age: {$ne: 21}});
  }