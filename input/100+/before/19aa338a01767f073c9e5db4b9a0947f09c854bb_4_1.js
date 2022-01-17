function(done) {
    var client = gazel.createClient();

    client.multi()
      .set('Fee', 1)
      .set('Fi', 2)
      .set('Fo', 3)
      .set('Fum', 4)
      .incrby('Fee', 10)
      .del('Fi', 'Fo', 'Fum')
      .get('Fee')
      .exec(function(res) {
        results = res;
        done();
      });
  }