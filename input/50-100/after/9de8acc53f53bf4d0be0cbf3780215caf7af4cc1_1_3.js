function receiverAndArgs(ast) {
    var args, receiver;
    receiver = nameSub(receiverFor(ast, 0));
    args = ast.leisureArgNames;
    return [
      receiver, args.slice(1, args.length).map(function(n) {
        return nameSub(n);
      }).filter(function(n) {
        return n !== receiver;
      })
    ];
  }