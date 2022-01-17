function receiverPositionFor(ast) {
    var i, _ref;
    for (i = 0, _ref = ast.leisureArgNames.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      if (ast.leisureTypeAssertions[ast.leisureArgNames[i]] != null) return i;
    }
    return -1;
  }