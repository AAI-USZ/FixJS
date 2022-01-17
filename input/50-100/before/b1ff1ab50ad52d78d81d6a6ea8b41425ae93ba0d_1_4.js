function(assert, done){
    var stream = fs.createReadStream(jsonFixture);
    client.putStream(stream, '/test/user.json', function(err, res){
      assert.ok(!err);
      if (100 !== res.statusCode) assert.equal(200, res.statusCode);
      done();
    });
  }