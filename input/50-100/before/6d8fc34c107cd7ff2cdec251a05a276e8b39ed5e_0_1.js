function(buffer) {
  try {
    this._parser.write(buffer);
    return true;
  } catch (err) {
    err.code = err.code || 'PROTOCOL_PARSER_EXCEPTION';
    err.fatal = true;

    this._delegateError(err);
  }

  return false;
}