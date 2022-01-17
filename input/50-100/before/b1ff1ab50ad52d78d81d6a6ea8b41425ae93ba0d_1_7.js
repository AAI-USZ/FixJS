function(assert, done){
    client.head('/test/user.json').on('response', function(res){
      assert.equal(200, res.statusCode);
      assert.equal('application/json', res.headers['content-type'])
      assert.equal(13, res.headers['content-length'])
      done();
    }).end();
  }