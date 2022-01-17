function getError(errback) {
  // Throw errors if no error handler was provided
  if (!errback) errback = function (err) { throw err; };

  if (this._errorOffset >= 0) {
    var line,
        lineNumber = 0,
        offset = 0,
        current = 0,
        error = this._errorStack || new Error();

    if (Array.isArray(this._errorSource)) {
      var strArray = util.inspect(this._errorSource, false, 4);
      error.message = this._errorRule + ' rule failed at: ' +
                      strArray + ':' +
                      this._errorOffset;
    } else {
      (this._errorSource || '').toString().split(/\n/g)
                               .some(function (source, i) {
        if (this._errorOffset > (current + source.length + 1)) {
          current += source.length + 1;
          return false;
        }

        offset = this._errorOffset - current;
        line = source;
        lineNumber = i;

        return true;
      }, this);

      error.message = this._errorRule + ' rule failed at: ' +
                      lineNumber + ':' + offset + '\n' +
                      line + '\n' +
                      new Array(offset + 1).join(' ') + '^';
      error.line = lineNumber;
      error.offset = line;
    }

    errback(error);
  } else {
    errback(new Error('Unexpected negative offset'));
  }
}