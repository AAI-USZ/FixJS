function, uses the previous return value', function() {
      var parser = string('x').skip(function() { return 'y'; });

      assert.equal(parser.parse('x'), 'x');
    }