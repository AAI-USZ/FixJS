function (object) {
        test.deepEqual(
          object,
          jsonObject,
          'UBJSON.unpackBuffer(' + dataType + ')'
        );

        test.done();
      }