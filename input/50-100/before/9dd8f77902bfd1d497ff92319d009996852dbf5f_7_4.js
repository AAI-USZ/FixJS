function () {
    var query = new Query();
    query.wherein.box('gps', {ll: [5, 25], ur: [10, 30]});
    query._conditions.should.eql({gps: {$within: {$box: [[5, 25], [10, 30]]}}});
  }