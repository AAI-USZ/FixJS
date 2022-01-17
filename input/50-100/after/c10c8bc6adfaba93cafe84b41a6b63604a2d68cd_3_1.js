function() {
      var parser1 = letter.then(function() { return 'not a parser' });
      assert.throws(function() { parser1.parse('x'); });

      var parser2 = letter.then('x');
      assert.throws(function() { letter.parse('xx'); });
    }