function() {
  var originalRequest = seraph.call._request;
  function setupMock(mock) {
    seraph._request = mock;
  };
  afterEach(function() {
    seraph._request = originalRequest;
  });
  
  it('should infer GET request if no data or method supplied', function(done) {
    var opts = { endpoint: '' };
    setupMock(function(opts, callback) {
      assert.ok(typeof callback === 'function');
      assert.equal(opts.method, 'GET');
      done();
    });
    var op = seraph.operation(opts, '');
    seraph.call(opts, op);
  });

  it('should infer POST request if data supplied', function(done) {
    var opts = { endpoint: '' };
    var testObject = {
      foo: 'foo',
      bar: 10
    };
    setupMock(function(opts, callback) {
      assert.ok(typeof callback === 'function');
      assert.equal(opts.method, 'POST');
      assert.deepEqual(opts.json, testObject);
      done();
    });
    var op = seraph.operation(opts, '', testObject);
    seraph.call(opts, op);
  });

  it('should add /db/data/ to url', function(done) {
    var opts = { endpoint: '' };
    var obj = {};
    setupMock(function(opts, callback) {
      assert.equal(opts.uri, '/db/data/');
      done();
    });
    var op = seraph.operation(opts, '', obj);
    seraph.call(opts, op);
  });
}