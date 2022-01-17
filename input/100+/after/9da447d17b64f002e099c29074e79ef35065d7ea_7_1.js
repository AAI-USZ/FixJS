function (test) {
    test.expect(5);

    var offset = UBJSON.packToBufferSync(jsonObject, buffer);

    resultBuffer = buffer.slice(0, offset);

    test.equal(
      resultBuffer.toString('binary'),
      ubjsonBuffer.toString('binary')
    );

    UBJSON.packToBuffer(jsonObject, buffer, function (error, offset) {
      test.equal(error, null);

      resultBuffer = buffer.slice(0, offset);

      test.equal(
        resultBuffer.toString('binary'),
        ubjsonBuffer.toString('binary')
      );

      UBJSON.unpackBuffer(ubjsonBuffer, function (error, value) {
        test.equal(error, null);
        test.equal(value, jsonObject);

        test.done();
      });
    });
  }