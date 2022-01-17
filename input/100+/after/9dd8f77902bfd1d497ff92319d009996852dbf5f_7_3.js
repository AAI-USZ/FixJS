function () {
    var query = new Query;
    query.find({ $or: [{x:1},{x:2}] });
    query._conditions.$or.length.should.equal(2);
    query.or([{y:"We're under attack"}, {z:47}]);
    query._conditions.$or.length.should.equal(4);
    query._conditions.$or[3].z.should.equal(47);
    query.or({z:"phew"});
    query._conditions.$or.length.should.equal(5);
    query._conditions.$or[3].z.should.equal(47);
    query._conditions.$or[4].z.should.equal("phew");
  }