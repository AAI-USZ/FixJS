function (test) {
    var called = 0;
    var args;
    var fn = overload([
      [overload.string, overload.arrayOptionalWithDefault(null), overload.callbackOptional, function (str, arr, callback) {
        args = arguments;
        called++;
      }]
    ]);
    fn('test');
    test.equals(called, 1, 'overload not called');
    test.equals(args.length, 3);
    test.equals(args[0], 'test');
    test.ok(args[1] === null);
    test.equals(typeof(args[2]), 'function');
    test.done();
  }