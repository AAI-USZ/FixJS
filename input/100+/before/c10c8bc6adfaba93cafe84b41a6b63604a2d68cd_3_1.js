function() {
    test('with a parser, uses the previous return value', function() {
      var parser = string('x').skip(string('y'));

      assert.equal(parser.parse('xy'), 'x');
      assert.throws(function() { parser.parse('x'); });
    });

    test('with a function, uses the previous return value', function() {
      var parser = string('x').skip(function() { return 'y'; });

      assert.equal(parser.parse('x'), 'x');
    });

    test('with a function that returns a parser, '+
         'uses the previous return value', function() {
      var piped;

      var parser = string('x').skip(function(x) {
        piped = x;
        return string('y');
      });

      assert.equal(parser.parse('xy'), 'x');
      assert.equal(piped, 'x');
    });
  }