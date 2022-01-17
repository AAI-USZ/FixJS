function (error, value) {
        test.equal(error, null);
        test.deepEqual(value, jsObject);

        test.done();
      }