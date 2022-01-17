function makeDispatchFunction(funcName, methodName, receiverName, argNames) {
    var disp, dispSrc;
    dispSrc = "(function(){return " + (genDispatchFunc(methodName, receiverName, 0, argNames.slice(1, argNames.length))) + ";})";
    console.log("DISPATCH " + funcName + "/" + methodName + " = " + dispSrc);
    disp = eval(dispSrc);
    if (!(LeisureObject.prototype[methodName] != null)) {
      if (global[methodName] != null) {
        LeisureObject.prototype[methodName] = genDispatchDefault(funcName, methodName, global[methodName], argNames);
      } else {
        LeisureObject.prototype[methodName] = true;
      }
    }
    define(funcName, disp, argNames.length, null, true);
    return disp;
  }