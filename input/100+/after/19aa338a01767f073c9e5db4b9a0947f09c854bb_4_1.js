function(done) {
    var client = gazel.createClient();

    var chain = client.multi();
    chain = chain.set('Fee', 1);
    chain = chain.set('Fi', 2);
    chain = chain.set('Fo', 3);
    chain = chain.set('Fum', 4);
    chain = chain.incrby('Fee', 10);
    chain = chain.del('Fi', 'Fo', 'Fum');
    chain = chain.get('Fee');
    chain.exec(function(res) {
      results = res;
      done();
    });
  }