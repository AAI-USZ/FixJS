function(
    output,
    polpetta,
    response
  ) {
    commonResponses.Status = polpetta.code(code);
    response.writeHead(
      code, commonResponses
    );
    response.end();
  }