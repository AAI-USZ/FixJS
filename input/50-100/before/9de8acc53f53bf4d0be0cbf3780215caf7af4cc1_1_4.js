function genDispatchFunc(methodName, receiverName, index, args) {
    var joined;
    if (index < args.length) {
      return "function(" + args[index] + ") {return " + (genDispatchFunc(methodName, receiverName, index + 1, args)) + ";}";
    } else {
      joined = args.join(', ');
      return "(" + receiverName + "() instanceof LeisureObject ? " + receiverName + "() : LeisureObject.prototype)." + methodName + "(" + joined + ")";
    }
  }