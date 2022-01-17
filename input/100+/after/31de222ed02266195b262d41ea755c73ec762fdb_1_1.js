function() {
    // Mock API
    var mockFn = mockRequest.mock()
    .get('/test-object-array')
      .respond({
        statusCode: 200,
        body: fixtures.arrayOfObjects
      })
    .run();

    var f1 = frisby.create(this.description)
      .get('http://mock-request/test-object-array', {mock: mockFn})
      .setHeaders({ 'Test': 'Two' })
      .after(function(err, res, body) {
        // Local setHeaders should override global
        expect(this.current.outgoing.headers['Test']).toBe('Two');
      })
      .toss();
  }