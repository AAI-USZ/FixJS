function(done){
    client.get('/test/user.json').on('response', function(res){
      assert.equal(404, res.statusCode);
      done();
    }).end();
  }