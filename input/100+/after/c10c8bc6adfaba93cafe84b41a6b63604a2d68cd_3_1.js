function() {
    test('returns a constant result', function() {
      var myResult = 1;
      var oneParser = string('x').result(1);

      assert.equal(oneParser.parse('x'), 1);

      var myFn = function() {};
      var fnParser = string('x').result(myFn);

      assert.equal(fnParser.parse('x'), myFn);
    });
  }