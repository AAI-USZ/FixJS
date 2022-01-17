function skipWhitespace(state) {
  while (state.strIdx < state.str.length && isWhitespace(state.str[state.strIdx])) {
    state.strIdx++;
  }
}