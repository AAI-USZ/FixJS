function (test) {
    test.expect(3);

    var offset = UBJSON.packToBufferSync(jsonObject, buffer);

    resultBuffer = buffer.slice(0, offset);
    
    test.deepEqual(
      resultBuffer.toString('binary'),
      ubjsonBuffer.toString('binary'),
      'UBJSON.packToBufferSync(' + dataType + ')'
    );

    UBJSON.packToBuffer(jsonObject, buffer, function (offset) {
      resultBuffer = buffer.slice(0, offset);

      test.deepEqual(
        resultBuffer.toString('binary'),
        ubjsonBuffer.toString('binary'),
        'UBJSON.packToBuffer(' + dataType + ')'
      );

      UBJSON.unpackBuffer(ubjsonBuffer, function (object) {
        test.deepEqual(
          object,
          jsonObject,
          'UBJSON.unpackBuffer(' + dataType + ')'
        );

        test.done();
      });
    });
  }