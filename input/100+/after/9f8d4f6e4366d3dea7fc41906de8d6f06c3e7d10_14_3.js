function assertParse(actual, expected, desc) {
    var ast, err, rest, _ref;
    _ref = LZ.parseFull(actual), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      throw new Error("Error: " + err);
    } else if (rest != null ? rest.trim() : void 0) {
      throw new Error("Error, input left after parsing: '" + (rest.trim()) + "'");
    } else {
      return assertEq(astPrint(ast), expected, desc != null ? desc : actual);
    }
  }