function _onData(chunk) {
  ~this._incomingMessageLength ? this._fetchHeader(chunk) : this._fetchBody(chunk);
}