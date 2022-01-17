function(done){
    var n = 0;
    fs.stat(jsonFixture, function(err, stat){
      if (err) throw err;
      fs.readFile(jsonFixture, function(err, buf){
        if (err) throw err;
        var req = client.put('/test/user.json', {
            'Content-Length': stat.size
          , 'Content-Type': 'application/json'
          , 'x-amz-acl': 'private'
        });
        req.on('response', function(res){
          assert.equal(200, res.statusCode);
          assert.equal(
              'http://'+client.endpoint+'/test/user.json'
            , client.url('/test/user.json'));
          assert.equal(
              'http://'+client.endpoint+'/test/user.json'
            , req.url);
          done();
        });
        req.end(buf);
      })
    });
  }