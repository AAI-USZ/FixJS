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

  var data = completer._getCompleterTemplateData();
  var realParams = data.emptyParameters;
  test.is(tests.emptyParameters.length, realParams.length,
          'emptyParameters.length for \'' + typed + '\'');

  if (realParams.length === tests.emptyParameters.length) {
    for (var i = 0; i < realParams.length; i++) {
      test.is(tests.emptyParameters[i], realParams[i].replace(/\u00a0/g, ' '),
              'emptyParameters[' + i + '] for \'' + typed + '\'');
    }
  }

  if (tests.directTabText) {
    test.is(tests.directTabText, data.directTabText,
            'directTabText for \'' + typed + '\'');
  }
  else {
    test.is('', data.directTabText, 'directTabText for \'' + typed + '\'');
  }

  if (tests.arrowTabText) {
    test.is(' \u00a0\u21E5 ' + tests.arrowTabText,
            data.arrowTabText,
            'arrowTabText for \'' + typed + '\'');
  }
  else {
    test.is('', data.arrowTabText, 'arrowTabText for \'' + typed + '\'');
  }
}