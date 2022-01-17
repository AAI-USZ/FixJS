function, pipes the value in and uses that return value', function() {
      var piped;

      var parser = string('x').then(function(x) {
        piped = x;
        return 'y';
      });

      assert.equal(parser.parse('x'), 'y')
      assert.equal(piped, 'x');
    }