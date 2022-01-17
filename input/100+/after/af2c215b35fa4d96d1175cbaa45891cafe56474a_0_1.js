function() {
  var seraph = _seraph(testDatabase);
  function setupMock(mock) {
    seraph._request = mock;
  };
  afterEach(function() {
    delete seraph._request;
  });
  
  it('should infer GET request if no data or method supplied', function(done) {
    var opts = { endpoint: '' };
    setupMock(function(opts, callback) {
      assert.ok(typeof callback === 'function');
      assert.equal(opts.method, 'GET');
      done();
    });
    var op = seraph.operation('');
    seraph.call(op);
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
    var op = seraph.operation('', testObject);
    seraph.call(op);
  });

  it('should add /db/data/ to url', function(done) {
    var opts = { endpoint: '' };
    var obj = {};
    setupMock(function(opts, callback) {
      assert.equal(opts.uri, testDatabase + '/db/data/');
      done();
    });
    var op = seraph.operation('', obj);
    seraph.call(op);
  });
}