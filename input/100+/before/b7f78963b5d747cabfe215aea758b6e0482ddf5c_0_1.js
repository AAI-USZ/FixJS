function isMatch(overloadDef, args) {
  var overloadDefIdx;
  var argIdx;
  for (overloadDefIdx = 0, argIdx = 0; overloadDefIdx < overloadDef.length - 1; overloadDefIdx++) {
    if (typeof(overloadDef[overloadDefIdx]) !== 'function') {
      throw new Error("Invalid overload definition. Array should only contain functions.");
    }
    var result = overloadDef[overloadDefIdx](args[argIdx]);
    if (result) {
      if (result.defaultValue) {
        args[argIdx] = result.defaultValue;
      }
      argIdx++;
    } else {
      if (overloadDef[overloadDefIdx].optional) {
        continue;
      }
      return false;
    }
  }
  //console.log(overloadDefIdx, overloadDef.length - 1, argIdx, args.length);
  if (overloadDefIdx === overloadDef.length - 1 && argIdx === args.length) {
    return true;
  }
  return false;
}