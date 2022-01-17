function (overloadDefs, args) {
  for (var i = 0; i < overloadDefs.length; i++) {
    if (i === overloadDefs.length - 1 && typeof(overloadDefs[i]) === 'function') {
      return { args: args, def: [overloadDefs[i]] };
    }
    var newArgs;
    if (newArgs = isMatch(overloadDefs[i], args)) {
      return { args: newArgs, def: overloadDefs[i] };
    }
  }
  return null;
}