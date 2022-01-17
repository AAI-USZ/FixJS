function(res){
          assert.equal(200, res.statusCode);
          assert.equal(
              'http://'+client.endpoint+'/test/user.json'
            , client.url('/test/user.json'));
          assert.equal(
              'http://'+client.endpoint+'/test/user.json'
            , req.url);
          done();
        }