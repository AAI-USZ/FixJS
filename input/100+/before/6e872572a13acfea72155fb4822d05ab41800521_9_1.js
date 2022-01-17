function() {
      var scope = nock(authUrl).post('', qs).reply(200, { status: 'okay', email: 'test@test.org' });

      var params = {
        body: { bid_assertion: qs.assertion }
      };

      var authResp = auth.verify(params, nconf, function(error, email) { });
      authResp.should.equal(true);
    }