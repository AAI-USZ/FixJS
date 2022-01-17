function (token) {
    if (token.type !== 'explicituri')
      return this._error('Expected explicituri to follow prefix "' + this.prefix + '"', token);
    var prefixURI;
    if (this._baseURI === null || absoluteURI.test(token.value))
      prefixURI = token.value;
    else
      prefixURI = (hashURI.test(token.value) ? this._baseURI : this._baseURIRoot) + token.value;
    this._prefixes[this._prefix] = prefixURI;
    return this._readDeclarationPunctuation;
  }