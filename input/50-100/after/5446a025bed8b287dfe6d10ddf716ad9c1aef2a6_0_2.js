function (token) {
    if (token.type !== 'explicituri')
      return this._error('Expected explicituri to follow base declaration', token);
    if (this._baseURI === null || absoluteURI.test(token.value))
      this._baseURI = token.value;
    else
      this._baseURI = (hashURI.test(token.value) ? this._baseURI : this._baseURIRoot) + token.value;
    this._baseURIRoot = this._baseURI.replace(documentPart, '');
    return this._readDeclarationPunctuation;
  }