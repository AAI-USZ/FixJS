function (object) {
        test.equal(
          object,
          jsonObject,
          'UBJSON.unpackBuffer(' + dataType + ')'
        );

        test.done();
      }