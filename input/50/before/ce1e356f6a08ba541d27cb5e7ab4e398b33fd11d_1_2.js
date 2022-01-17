function(done) {
          var client = this.instapaperClient;
          client.getUser(function() {
            client._makeRequest.executed.should.be.true;
            done();
          });
        }