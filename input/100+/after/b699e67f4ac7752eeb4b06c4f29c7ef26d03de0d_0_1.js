function (part, callback) {
    if (state.completer) {
      return callback();
    }

    if (part.op === 'commandName') {
      return parseCommandName(state, part, callback);
    }

    if (part.op === 'requiredParameter') {
      return parseRequiredParameter(state, part, callback);
    }

    if (part.op === 'optionalParameters') {
      return parseOptionalParameters(state, part, callback);
    }

    if (part.op === 'literal') {
      return parseLiteral(state, part, callback);
    }

    if (part.op === 'optionalParameterLiteralOr') {
      return parseOptionalParameterLiteralOr(state, part, callback);
    }

    return callback(new Error("could not parse: " + JSON.stringify(state)));
  }