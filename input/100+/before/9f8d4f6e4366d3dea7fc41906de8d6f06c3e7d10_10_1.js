function generateCode(file, contents, loud, handle, nomacros, check, debug) {
    var auto, errs, globals, _ref;
    _ref = findDefs(contents, nomacros, loud), globals = _ref[0], errs = _ref[1], auto = _ref[2];
    console.log("auto: '" + auto + "'");
    return runAutosThen(auto, debug, function() {
      return generate(file, contents, loud, handle, nomacros, check, globals, errs, debug);
    });
  }