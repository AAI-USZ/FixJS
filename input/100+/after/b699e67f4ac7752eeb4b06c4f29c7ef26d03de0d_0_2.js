function parseRequiredParameter(state, part, callback) {
  if (state.debug) {
    console.log('parseRequiredParameter', state, part);
  }
  var val = readNextWord(state);
  if (val.length === 0 && !state.completing) {
    return callback(null, false);
  }

  state.result.params[part.name] = val;
  var endsInSpace = skipWhitespace(state);

  if (!endsInSpace && state.completers && state.completers[part.name]) {
    state.completers[part.name](val, function (err, values) {
      if (err) {
        return callback(err);
      }
      state.completer = {
        partial: val,
        value: values
      };
      return callback(null, true);
    });
  } else {
    return callback(null, true);
  }
}