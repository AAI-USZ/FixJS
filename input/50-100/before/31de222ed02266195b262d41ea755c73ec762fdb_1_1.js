function() {
    // Mock API
    var mockFn = mockRequest.mock()
    .get('/not-found')
      .respond({
        statusCode: 404
      })
    .run();

    var f1 = frisby.create('test with httpbin for array of JSON objects')
      .get('http://mock-request/not-found', {mock: mockFn})
      .expectStatus(404)
      .toss();
  }