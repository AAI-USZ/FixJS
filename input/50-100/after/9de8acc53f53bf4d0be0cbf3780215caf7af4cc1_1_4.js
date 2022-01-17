function receiverFor(ast, index) {
    if (index < ast.leisureArgNames.length) {
      if (ast.leisureTypeAssertions[ast.leisureArgNames[index]]) {
        return ast.leisureArgNames[index];
      } else {
        return receiverFor(ast, index + 1);
      }
    } else {
      return null;
    }
  }