function(done) {
    client.set('foo', 'bar', function(res) {
      isOk(done)(res); 
    });
  }