function (overloadDefs, args) {
  for (var i = 0; i < overloadDefs.length; i++) {
    if (i === overloadDefs.length - 1 && typeof(overloadDefs[i]) === 'function') {
      return [overloadDefs[i]];
    }
    if (isMatch(overloadDefs[i], args)) {
      return overloadDefs[i];
    }
  }
  return null;
}