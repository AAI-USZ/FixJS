function (token) {
    if (token.type !== 'explicituri')
      return this._error('Expected explicituri to follow base declaration', token);
    if (this._baseURI === null || absoluteURI.test(token.value))
      this._baseURI = token.value;
    else
      this._baseURI += token.value;
    return this._readDeclarationPunctuation;
  }