function (match, mutator, args) {
    var path = match.input
      , remainder = to.slice(path.length + 1)
      , argsOut = args.out, args1 = args[1]

    if (mutator === 'set') {
      args[1] = args1 && lookup(remainder, args1);
      args.out = argsOut && lookup(remainder, argsOut);
    } else if (mutator === 'del') {
      args.out = argsOut && lookup(remainder, argsOut);
    } else {
      // Don't emit an event if not a set or delete
      return null;
    }
    return from;
  }