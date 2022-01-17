function () {

    it('should set key and default url when url is not provided', function () {
      sapi = new (create(checks, mocks))('somekey');
      sapi.params.key.should.equal('somekey');
      sapi.url.should.equal('http://api.sensis.com.au/ob-20110511/test');
    });

    it('should set specified key and url when provided', function () {
      sapi = new (create(checks, mocks))('somekey', 'http://someurl');
      sapi.params.key.should.equal('somekey');
      sapi.url.should.equal('http://someurl');
    });

    it('should pass error to callback when an error occurs while sending request', function (done) {
      mocks.request_err = new Error('someerror');
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))();
      sapi.search(function cb(err, result) {
        checks.sapi_search_err = err;
        checks.sapi_search_result = result;
        done();
      });
      checks.sapi_search_err.message.should.equal('someerror');
      should.not.exist(checks.sapi_search_result);
    });
  }