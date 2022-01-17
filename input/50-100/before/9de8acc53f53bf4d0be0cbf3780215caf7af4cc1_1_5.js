function receiverAndArgs(ast) {
    var args, rPos, receiver;
    rPos = receiverPositionFor(ast);
    args = ast.leisureArgNames;
    receiver = nameSub(args[rPos]);
    return [
      receiver, args.slice(1, args.length).map(function(n) {
        return nameSub(n);
      }).filter(function(n) {
        return n !== receiver;
      })
    ];
  }