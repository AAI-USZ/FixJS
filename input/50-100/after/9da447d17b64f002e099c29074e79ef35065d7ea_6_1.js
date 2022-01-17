function (test) {
    test.expect(2);

    UBJSON.unpackBuffer(ubjsonBuffer, function (error, value) {
      test.equal(error, null);
      test.deepEqual(value, jsonObject);

      test.done();
    });
  }