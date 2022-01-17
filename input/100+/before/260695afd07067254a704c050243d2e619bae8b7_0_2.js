function(data, encoding) {
  if (this.finished) {
    return false;
  }
  if (!this._header) {
    this._implicitHeader();
  }

  if (data && !this._hasBody) {
    console.error('This type of response MUST NOT have a body. ' +
                  'Ignoring data passed to end().');
    data = false;
  }

  var ret;

  var hot = this._headerSent === false &&
            typeof(data) === 'string' &&
            data.length > 0 &&
            this.output.length === 0 &&
            this.connection &&
            this.connection.writable &&
            this.connection._httpMessage === this;

  if (hot) {
    // Hot path. They're doing
    //   res.writeHead();
    //   res.end(blah);
    // HACKY.

    if (this.chunkedEncoding) {
      var l = Buffer.byteLength(data, encoding).toString(16);
      ret = this.connection.write(this._header + l + CRLF +
                                  data + '\r\n0\r\n' +
                                  this._trailer + '\r\n', encoding);
    } else {
      ret = this.connection.write(this._header + data, encoding);
    }
    this._headerSent = true;

  } else if (data) {
    // Normal body write.
    ret = this.write(data, encoding);
  }

  if (!hot) {
    if (this.chunkedEncoding) {
      ret = this._send('0\r\n' + this._trailer + '\r\n'); // Last chunk.
    } else {
      // Force a flush, HACK.
      ret = this._send('');
    }
  }

  this.finished = true;

  // There is the first message on the outgoing queue, and we've sent
  // everything to the socket.
  debug('outgoing message end.');
  if (this.output.length === 0 && this.connection._httpMessage === this) {
    this._finish();
  }

  return ret;
}