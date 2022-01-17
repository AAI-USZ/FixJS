function(done) {
          var client = this.instapaperClient;
          client.getUser(function() {
            client._oauthClient.get.executed.should.be.true;
            done();
          });
        }