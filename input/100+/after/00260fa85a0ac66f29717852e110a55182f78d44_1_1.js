function(options, tests) {
  var requisition = options.display.requisition;
  var inputter = options.display.inputter;
  var completer = options.display.completer;

  if (tests.typed) {
    inputter.setInput(tests.typed);
  }
  else {
    test.ok(false, "Missing typed for " + JSON.stringify(tests));
    return;
  }

  if (tests.cursor) {
    inputter.setCursor(tests.cursor);
  }

  if (tests.status) {
    test.is(requisition.getStatus().toString(), tests.status,
            "status for " + tests.typed);
  }

  var data = completer._getCompleterTemplateData();
  if (tests.emptyParameters != null) {
    var realParams = data.emptyParameters;
    test.is(realParams.length, tests.emptyParameters.length,
            'emptyParameters.length for \'' + tests.typed + '\'');

    if (realParams.length === tests.emptyParameters.length) {
      for (var i = 0; i < realParams.length; i++) {
        test.is(realParams[i].replace(/\u00a0/g, ' '), tests.emptyParameters[i],
                'emptyParameters[' + i + '] for \'' + tests.typed + '\'');
      }
    }
  }

  if (tests.markup) {
    var cursor = tests.cursor ? tests.cursor.start : tests.typed.length;
    var statusMarkup = requisition.getInputStatusMarkup(cursor);
    var actualMarkup = statusMarkup.map(function(s) {
      return Array(s.string.length + 1).join(s.status.toString()[0]);
    }).join('');
    test.is(tests.markup, actualMarkup, 'markup for ' + tests.typed);
  }

  if (tests.directTabText) {
    test.is(data.directTabText, tests.directTabText,
            'directTabText for \'' + tests.typed + '\'');
  }

  if (tests.arrowTabText) {
    test.is(data.arrowTabText, ' \u00a0\u21E5 ' + tests.arrowTabText,
            'arrowTabText for \'' + tests.typed + '\'');
  }
}