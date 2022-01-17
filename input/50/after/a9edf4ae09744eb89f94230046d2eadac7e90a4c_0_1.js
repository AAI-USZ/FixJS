function() {
    assertParsesLatex(parseRoot, 'x^{n}', 'x^n');
    assertParsesLatex(parseRoot, 'x^{nm}');
    assertParsesLatex(parseRoot, 'x^{}', 'x^{ }');
  }