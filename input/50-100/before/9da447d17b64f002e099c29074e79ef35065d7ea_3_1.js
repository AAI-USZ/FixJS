function (test) {
    test.expect(1);

    UBJSON.unpackBuffer(ubjsonBuffer, function (object) {
      test.equal(
        object,
        jsonObject,
        'UBJSON.unpackBuffer(' + dataType + ')'
      );

      test.done();
    });
  }