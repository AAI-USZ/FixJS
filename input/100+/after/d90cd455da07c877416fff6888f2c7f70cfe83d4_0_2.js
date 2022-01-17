function isReachable(state, merge) {
  // Skip mutual states
  if (!state) return this.mutual ? -1 : 0;
  if (state.mutual || this.mutual) return -1;

  // If current node knows more info - next is unreachable
  // (low state check)
  if (Object.keys(state.states.low).length >
      Object.keys(this.states.low).length) {
    return -1;
  }

  var current = merge ? this._mergedState() : this.states.high,
      next = state.states.high,
      currentKeys = Object.keys(current),
      nextKeys = Object.keys(next);

  // If current node knows more info - next is unreachable
  if (nextKeys.length > currentKeys.length) return -1;

  var reachable = currentKeys.every(function(key) {
    if (!next[key]) return true;

    return next[key].every(function(value) {
      return current[key].indexOf(value) !== -1;
    });
  }) && nextKeys.every(function(key) {
    return currentKeys.indexOf(key) !== -1;
  });

  return reachable ? currentKeys.length - nextKeys.length : -1;
}