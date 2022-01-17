function(
    output,
    polpetta,
    response
  ) {
    output.push(
      polpetta.code(code)
    );
    return flushResponse.call(
      output,
      polpetta,
      response,
      code,
      "txt"
    );
  }