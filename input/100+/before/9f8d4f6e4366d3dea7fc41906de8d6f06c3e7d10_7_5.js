function parseOptional(string, macros) {
    var err, res, rest, tok, _ref, _ref2;
    _ref = parsePhase1(string), res = _ref[0], err = _ref[1], rest = _ref[2];
    if (err) {
      return [null, err, rest];
    } else {
      _ref2 = listToAst(res), res = _ref2[0], err = _ref2[1], tok = _ref2[2];
      if (res) {
        return [res, null, rest];
      } else {
        return [null, err, string.substring(tok.pos())];
      }
    }
  }