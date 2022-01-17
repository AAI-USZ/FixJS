function() {
      var parser = string('x').skip(string('y'));

      assert.equal(parser.parse('xy'), 'x');
      assert.throws(function() { parser.parse('x'); });
    }