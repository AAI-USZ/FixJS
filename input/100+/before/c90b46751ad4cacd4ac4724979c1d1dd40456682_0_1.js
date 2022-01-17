function makeDispatchFunction(funcName, methodName, receiverName, argNames) {
    var disp, dispSrc;
    dispSrc = "(function(){return " + (genDispatchFunc(methodName, receiverName, 0, argNames.slice(1, argNames.length))) + ";})";
    disp = eval(dispSrc);
    if (!(LeisureObject.prototype[methodName] != null) && (global[methodName] != null)) {
      LeisureObject.prototype[methodName] = global[methodName]();
    }
    define(funcName, disp, argNames.length, null, true);
    return disp;
  }