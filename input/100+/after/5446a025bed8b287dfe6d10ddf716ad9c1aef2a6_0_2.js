function (token) {
    switch (token.type) {
    case 'explicituri':
      if (this._baseURI === null || absoluteURI.test(token.value))
        this._subject = token.value;
      else
        this._subject = (hashURI.test(token.value) ? this._baseURI : this._baseURIRoot) + token.value;
      break;
    case 'qname':
      if (token.prefix === '_') {
        this._subject = this._blankNodes[token.value] ||
                        (this._blankNodes[token.value] = '_:b' + this._blankNodeCount++);
      }
      else {
        var prefix = this._prefixes[token.prefix];
        if (prefix === undefined)
          return this._error('Undefined prefix "' + token.prefix + ':"', token);
        this._subject = prefix + token.value;
      }
      break;
    case 'bracketopen':
      // Start a new triple with a new blank node as subject.
      this._subject = '_:b' + this._blankNodeCount++;
      this._tripleStack.push({ subject: this._subject, predicate: null, object: null, type: 'blank' });
      return this._readBlankNodeHead;
    case 'liststart':
      // Start a new list
      this._tripleStack.push({ subject: RDF_NIL, predicate: null, object: null, type: 'list' });
      this._subject = null;
      return this._readListItem;
    default:
      return this._error('Unexpected token type "' + token.type, token);
    }
    // The next token must be a predicate.
    return this._readPredicate;
  }