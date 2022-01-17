function (error, value) {
    message++;

    if (message === 1) {
      test.ok(error instanceof Error);
      test.ok(typeof value === 'undefined');

      test.ok(error.message.match(/\{"1":2\}/));
    } else {
      test.equal(error, null);
      test.equal(value, 5);

      test.done();
    }
  }