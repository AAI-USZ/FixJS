function(done) {
      var response = {
        status: 'okay',
        email: 'test@test.org'
      };

      var scope = nock(authUrl)
        .post('/verify', qsString)
        .reply(200, response);

      var params = {
        body: {
          bid_assertion: qs.assertion
        }
      };

      var authResp = auth.verify(params, nconf, function(error, email) {
        should.not.exist(error);
        email.should.equal(response.email);
        done();
      });
    }