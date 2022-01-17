function _fetchHeader(chunk) {
  var header

  if (this._bufferJoiner.length + chunk.length >= 9) {
    header = this._bufferJoiner.add(chunk).join();
    this._eventLength = header.readUInt32BE(0);
    this._messageLength = header.readUInt32BE(4);
    this._messagetype = header.readInt8(8);
    this._fetchBody(chunk.slice(9));
  } else {
    this._bufferJoiner.add(chunk);
  }
}