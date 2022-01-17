function(done) {
          var client = this.instapaperClient;
          client.getUser(function() {
            client._oauthClient.get.executed.should.be.true;
            client._oauthClient.get.args[0].should.equal(BASE_URL + '/account/verify_credentials');
            client._oauthClient.get.args[1].should.equal('testAccessToken');
            client._oauthClient.get.args[2].should.equal('testAccessTokenSecret');
            client._oauthClient.get.args[3].should.be.a('function');
            done();
          });
        }