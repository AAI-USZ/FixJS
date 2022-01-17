function type(typed, tests, options) {
  var inputter = options.display.inputter;
  var completer = options.display.completer;

  inputter.setInput(typed);

  if (tests.cursor) {
    inputter.setCursor({ start: tests.cursor, end: tests.cursor });
  }

  if (tests.emptyParameters == null) {
    tests.emptyParameters = [];
  }

  var realParams = completer.emptyParameters;
  test.is(tests.emptyParameters.length, realParams.length,
          'emptyParameters.length for \'' + typed + '\'');

  if (realParams.length === tests.emptyParameters.length) {
    for (var i = 0; i < realParams.length; i++) {
      test.is(tests.emptyParameters[i], realParams[i].replace(/\u00a0/g, ' '),
              'emptyParameters[' + i + '] for \'' + typed + '\'');
    }
  }

  if (tests.directTabText) {
    test.is(tests.directTabText, completer.directTabText,
            'directTabText for \'' + typed + '\'');
  }
  else {
    test.is('', completer.directTabText,
            'directTabText for \'' + typed + '\'');
  }

  if (tests.arrowTabText) {
    test.is(' \u00a0\u21E5 ' + tests.arrowTabText,
            completer.arrowTabText,
            'arrowTabText for \'' + typed + '\'');
  }
  else {
    test.is('', completer.arrowTabText,
            'arrowTabText for \'' + typed + '\'');
  }
}