function (test) {
    test.expect(5);

    var offset = UBJSON.packToBufferSync(jsObject, buffer);
    resultBuffer = buffer.slice(0, offset);

    test.equal(
      resultBuffer.toString('binary'),
      ubjsonBuffer.toString('binary')
    );

    UBJSON.packToBuffer(jsObject, buffer, function (error, offset) {
      test.equal(error, null);

      resultBuffer = buffer.slice(0, offset);

      test.equal(
        resultBuffer.toString('binary'),
        ubjsonBuffer.toString('binary')
      );

      UBJSON.unpackBuffer(ubjsonBuffer, function (error, value) {
        test.equal(error, null);
        test.deepEqual(value, jsObject);

        test.done();
      });
    });
  }