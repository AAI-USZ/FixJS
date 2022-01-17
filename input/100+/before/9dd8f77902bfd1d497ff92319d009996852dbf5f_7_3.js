function () {
    var query = new Query();
    query.asc('a', 'z').desc('c', 'v').asc('b');
    query.options.sort.should.eql([['a', 1], ['z', 1], ['c', -1], ['v', -1], ['b', 1]]);
  }