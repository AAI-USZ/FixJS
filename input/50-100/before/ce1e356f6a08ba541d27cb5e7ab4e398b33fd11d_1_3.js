function() {
            client._makeRequest.executed.should.be.true;
            client._makeRequest.args[0].should.equal(BASE_URL + '/account/verify_credentials');
            client._makeRequest.args[1].should.be.a('function');
            done();
          }