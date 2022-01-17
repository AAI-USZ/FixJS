function (test) {
    test.expect(3);

    var offset = UBJSON.packToBufferSync(jsObject, buffer);
    resultBuffer = buffer.slice(0, offset);

    test.equal(
      resultBuffer.toString('binary'),
      ubjsonBuffer.toString('binary')
    );

    UBJSON.packToBuffer(jsObject, buffer, function (offset) {
      resultBuffer = buffer.slice(0, offset);

      test.equal(
        resultBuffer.toString('binary'),
        ubjsonBuffer.toString('binary')
      );

      UBJSON.unpackBuffer(ubjsonBuffer, function (object) {
        test.deepEqual(
          object,
          jsObject
        );

        test.done();
      });
    });
  }