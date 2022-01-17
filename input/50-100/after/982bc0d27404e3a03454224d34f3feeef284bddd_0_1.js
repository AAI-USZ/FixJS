function collectArgs(ast, n) {
    var args, i;
    args = [];
    for (i = 0; 0 <= n ? i < n : i > n; 0 <= n ? i++ : i--) {
      args.push(Parse.nameSub(Parse.getLambdaVar(ast)));
      ast = Parse.getLambdaBody(ast);
    }
    return args;
  }