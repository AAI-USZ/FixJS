function _fetchBody(chunk) {
  var raw, event, data;
  var chunkLength = chunk.length;
  var bytesLeft = (this._eventLength + this._messageLength) - this._bufferJoiner.length;

  if (chunkLength >= bytesLeft) {
    raw = this._bufferJoiner.add(chunk.slice(0, bytesLeft)).join();
    event = JSON.parse(raw.slice(0, this._eventLength));
    data = this._messagetype ? raw.slice(this._eventLength) : JSON.parse(raw.slice(this._eventLength).toString());

    this._eventLength = -1;
    this._messageLength = -1;
    this.emit(['data'].concat(event), data);

    if (chunkLength - bytesLeft) {
      process.nextTick(this._fetchHeader.bind(this, chunk.slice(bytesLeft)));
    }

    return;
  }

  this._bufferJoiner.add(chunk);
}