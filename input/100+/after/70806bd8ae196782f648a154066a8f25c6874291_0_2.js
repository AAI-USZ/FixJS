function isMatch(overloadDef, args) {
  var overloadDefIdx;
  var argIdx;
  var newArgs = [];
  for (overloadDefIdx = 0, argIdx = 0; overloadDefIdx < overloadDef.length - 1; overloadDefIdx++) {
    if (typeof(overloadDef[overloadDefIdx]) !== 'function') {
      throw new Error("Invalid overload definition. Array should only contain functions.");
    }
    var result = overloadDef[overloadDefIdx](args[argIdx]);
    if (result) {
      if (result.hasOwnProperty('defaultValue')) {
        newArgs.push(result.defaultValue);
      } else {
        newArgs.push(args[argIdx]);
        argIdx++;
      }
    } else {
      if (overloadDef[overloadDefIdx].optional) {
        newArgs.push(undefined);
        continue;
      }
      return false;
    }
  }
  //console.log(overloadDefIdx, overloadDef.length - 1, argIdx, args.length, newArgs.length);
  if (overloadDefIdx === overloadDef.length - 1 && argIdx === args.length) {
    return newArgs;
  }
  return false;
}