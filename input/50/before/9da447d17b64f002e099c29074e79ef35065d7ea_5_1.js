function () {
      test.equal(
        valuesReceived,
        jsonArray.length,
        'UbjsonStream@value(' + dataType + ')'
      );

      test.done();
    }