function getNargs(ast, n) {
    if (n === 0) {
      return Nil;
    } else {
      return cons(Parse.getLambdaVar(ast), getNargs(Parse.getLambdaBody(ast), n - 1));
    }
  }