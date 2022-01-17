function (error, offset) {
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
    }