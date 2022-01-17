function (error, value) {
        test.equal(error, null);
        test.equal(value, jsonObject);

        test.done();
      }