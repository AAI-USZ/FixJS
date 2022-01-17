function (error, value) {
        test.equal(error, null);
        test.deepEqual(value, jsonObject);

        test.done();
      }