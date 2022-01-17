function getNthBody(ast, n) {
    if (n === 1) {
      return ast;
    } else {
      if (Parse.getType(ast) !== 'lambda') {
        throw new Error("Error: Expected lambda, but got " + (Parse.getType(ast)));
      }
      return getNthBody(getLambdaBody(ast), n - 1);
    }
  }