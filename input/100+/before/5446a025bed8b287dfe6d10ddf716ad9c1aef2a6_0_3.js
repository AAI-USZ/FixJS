function (token) {
    switch (token.type) {
    case 'explicituri':
      if (this._baseURI === null || absoluteURI.test(token.value))
        this._predicate = token.value;
      else
        this._predicate = this._baseURI + token.value;
      break;
    case 'qname':
      if (token.prefix === '_') {
        this._predicate = this._blankNodes[token.value] ||
                          (this._blankNodes[token.value] = '_:b' + this._blankNodeCount++);
      }
      else {
        var prefix = this._prefixes[token.prefix];
        if (prefix === undefined)
          return this._error('Undefined prefix "' + token.prefix + ':"', token);
        this._predicate = prefix + token.value;
      }
      break;
    default:
      return this._error('Expected predicate to follow "' + this._subject + '"', token);
    }
    // The next token must be an object.
    return this._readObject;
  }