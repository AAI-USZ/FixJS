function (token) {
    if (token.type !== 'explicituri')
      return this._error('Expected explicituri to follow prefix "' + this.prefix + '"', token);
    if (this._baseURI === null || absoluteURI.test(token.value))
      this._prefixes[this._prefix] = token.value;
    else
      this._prefixes[this._prefix] = this._baseURI + token.value;
    return this._readDeclarationPunctuation;
  }