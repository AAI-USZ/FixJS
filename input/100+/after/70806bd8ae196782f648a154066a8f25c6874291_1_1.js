function (test) {
    var called = 0;
    var args;
    var fn = overload([
      [overload.string, overload.arrayOptional, overload.callbackOptional, function (str, arr, callback) {
        args = arguments;
        called++;
      }]
    ]);
    var fnTest = function zzz() {};
    fn('test', fnTest);
    test.equals(called, 1, 'overload not called');
    test.equals(args.length, 3);
    test.equals(args[0], 'test');
    test.ok(args[1] === undefined, 'invalid argument, expected undefined: ' + args[1]);
    test.equals(args[2].name, 'zzz');
    test.done();
  }