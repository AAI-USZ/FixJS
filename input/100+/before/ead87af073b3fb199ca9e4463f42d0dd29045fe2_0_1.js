function (match, mutator, args) {
    var path = match.input
      , remainder = to.slice(path.length + 1)

    if (mutator === 'set') {
      args[1] = lookup(remainder, args[1]);
      args.out = lookup(remainder, args.out);
    } else if (mutator === 'del') {
      args.out = lookup(remainder, args.out);
    } else {
      // Don't emit an event if not a set or delete
      return null;
    }
    return from;
  }