function skipWhitespace(state) {
  var startStrIdx = state.strIdx;
  while (state.strIdx < state.str.length && isWhitespace(state.str[state.strIdx])) {
    state.strIdx++;
  }
  return state.strIdx !== startStrIdx;
}