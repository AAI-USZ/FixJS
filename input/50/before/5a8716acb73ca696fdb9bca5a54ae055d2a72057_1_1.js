function() {
    var ast = candor.parser.parse('13589');

    assert.deepEqual(ast, [['number', 13589]]);
  }