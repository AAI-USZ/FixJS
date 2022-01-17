function (test) {
    test.expect(1);

    UBJSON.unpackBuffer(ubjsonBuffer, function (object) {
      test.deepEqual(
        object,
        jsonObject,
        'UBJSON.unpackBuffer(' + dataType + ')'
      );

      test.done();
    });
  }