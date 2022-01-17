function eachPair(args, it) {
    var end = ~~((args[length]-1)/2);
    for (var i = 1; i <= end; i++) {
      it(args[i*2-1], args[i*2]);
    }
  }