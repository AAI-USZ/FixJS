function () {
    var query = new Query();
    query.within.center('gps', {center: [5, 25], radius: 5});
    query._conditions.should.eql({gps: {$within: {$center: [[5, 25], 5]}}});
  }