function () {
    var query = new Query();
    query.where('checkin').near([40, -72]).maxDistance(1);
    query._conditions.should.eql({checkin: {$near: [40, -72], $maxDistance: 1}});
    query = new Query();
    query.where('checkin').near([40, -72]).$maxDistance(1);
    query._conditions.should.eql({checkin: {$near: [40, -72], $maxDistance: 1}});
  }