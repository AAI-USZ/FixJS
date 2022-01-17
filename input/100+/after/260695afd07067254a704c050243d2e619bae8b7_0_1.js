function(chunk, encoding) {
  if (!this._header) {
    this._implicitHeader();
  }

  if (!this._hasBody) {
    debug('This type of response MUST NOT have a body. ' +
          'Ignoring write() calls.');
    return true;
  }

  if (typeof chunk !== 'string' && !Buffer.isBuffer(chunk)) {
    throw new TypeError('first argument must be a string or Buffer');
  }

  if (chunk.length === 0) return false;

  var len, ret;
  if (this.chunkedEncoding) {
    if (typeof(chunk) === 'string') {
      len = Buffer.byteLength(chunk, encoding);
      chunk = len.toString(16) + CRLF + chunk + CRLF;
      ret = this._send(chunk, encoding);
    } else {
      // buffer
      len = chunk.length;
      this._send(len.toString(16) + CRLF);
      this._send(chunk);
      ret = this._send(CRLF);
    }
  } else {
    ret = this._send(chunk, encoding);
  }

  debug('write ret = ' + ret);
  return ret;
}