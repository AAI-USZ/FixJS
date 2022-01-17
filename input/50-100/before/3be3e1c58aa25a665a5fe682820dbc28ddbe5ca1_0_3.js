function collectDateArguments(args) {
    var obj, arr;
    if(object.isObject(args[0])) {
      return args;
    } else if (args.length == 1 && object.isNumber(args[0])) {
      return [args[0]];
    }
    obj = {};
    DateArgumentUnits.each(function(u,i) {
      obj[u.unit] = args[i];
    });
    return [obj];
  }