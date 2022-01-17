function() {
    this._stream && this._stream.stop();

    delete this._stream;
  }