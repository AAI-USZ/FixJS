function(done){
    client.del('/test/user.json').on('response', function(res){
      assert.equal(204, res.statusCode);
      done();
    }).end();
  }