function parseOptional(string, macros) {
    var err, macres, res, rest, _ref;
    _ref = defaultScanner.scan(string), res = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      return [null, err, rest];
    } else {
      macres = [(macros ? substituteMacros(res) : res), null, rest];
      return ifParsed((macros ? defaultScanner.filter(0, macres) : macres), function(macroed, rest) {
        var tok, _ref2;
        _ref2 = listToAst(macroed), res = _ref2[0], err = _ref2[1], tok = _ref2[2];
        if (res) {
          return [res, null, rest];
        } else {
          return [null, err, (tok ? string.substring(tok.start()) : rest)];
        }
      });
    }
  }