function (test) {
    var called = 0;
    var args = null;
    var fn = overload([
      [overload.string, function () { test.fail('this function should not be called'); }],
      [overload.string, overload.number, overload.funcOptional, function () {
        args = Array.prototype.slice.call(arguments, 0);
        called++;
      }]
    ]);
    var argFn = function () {};
    fn('test', 5, argFn);
    test.equals(called, 1, 'overload not called');
    test.deepEqual(args, ['test', 5, argFn], 'overload called with wrong args');
    test.done();
  }