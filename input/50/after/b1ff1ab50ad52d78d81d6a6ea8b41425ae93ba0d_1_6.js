function(done){
    client.head('/test/user.json').on('response', function(res){
      assert.equal(404, res.statusCode);
      done();
    }).end();
  }