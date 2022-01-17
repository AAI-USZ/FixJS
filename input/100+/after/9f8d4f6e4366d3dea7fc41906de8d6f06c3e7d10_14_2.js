function assertEvalPrint(actual, expected, desc) {
    var ast, code, err, rest, v, _ref;
    _ref = LZ.parseFull(actual), ast = _ref[0], err = _ref[1], rest = _ref[2];
    if (err != null) {
      throw new Error("Error: " + err);
    } else if (rest != null ? rest.trim() : void 0) {
      throw new Error("Error, input left after parsing: '" + (rest.trim()) + "'");
    } else {
      code = LZ.gen(ast);
      if (code.err) throw new Error(code.err);
      v = Parse.print(LZ.astEval(code));
      return assertEq(v, expected, desc != null ? desc : actual);
    }
  }