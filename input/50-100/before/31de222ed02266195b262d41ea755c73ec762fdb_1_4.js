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
      .expectJSON('test_subjects.?', { // ? == ONE object in here should match (contains)
        test_str: "I am a string two!",
        test_int: 43
      })
      .toss();
  }