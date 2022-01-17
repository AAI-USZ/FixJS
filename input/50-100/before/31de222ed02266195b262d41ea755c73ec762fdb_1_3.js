function() {
    // Mock API
    var mockFn = mockRequest.mock()
    .get('/test-object-array')
      .respond({
        statusCode: 200,
        body: fixtures.arrayOfObjects
      })
    .run();

    var f1 = frisby.create('test with httpbin for array of JSON objects')
      .get('http://mock-request/test-object-array', {mock: mockFn})
      .expectJSON('test_subjects.*', { // * == EACH object in here should match
        test_str_same: String,
        test_optional: function(val) { expect(val).toBeTypeOrNull(String); }
      })
      .toss();
  }