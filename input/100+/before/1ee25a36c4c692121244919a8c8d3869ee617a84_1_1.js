function() {
  function assertParsesLatex(str, latex) {
    if (!latex) latex = str;

    var result = latexParser.parse(str).join('latex');
    assert.equal(result, latex,
      'parsing '+str+', got '+result+', expected '+latex
    );
  }

  test('variables', function() {
    assertParsesLatex('xyz');
  });

  test('simple exponent', function() {
    assertParsesLatex('x^n');
  });

  test('block exponent', function() {
    assertParsesLatex('x^{n}', 'x^n');
    assertParsesLatex('x^{nm}');
    assertParsesLatex('x^{}', 'x^{ }');
  });

  test('nested exponents', function() {
    assertParsesLatex('x^{n^m}');
  });
}