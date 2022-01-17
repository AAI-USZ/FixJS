function (input, callback) {
    var self = this;
    // Initialize prefix declarations.
    this._prefixes = Object.create(null);
    // Set the triple callback.
    this._callback = callback;
    // The read callback is the next function to be executed when a token arrives.
    // We start reading in the top context.
    this._readCallback = this._readInTopContext;
    // Execute the read callback when a token arrives.
    this._lexer.tokenize(input, function (error, token) {
      if (error !== null)
        self._callback(error);
      else if (self._readCallback !== undefined)
        self._readCallback = self._readCallback(token);
    });
  }