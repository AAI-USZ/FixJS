function _onData(chunk) {
  ~this._messageLength
    ? this._fetchBody(chunk)
    : this._fetchHeader(chunk);
}