function(packet) {
  if (!this._callback) {
    this.emit('result', packet, this._index);
  } else {
    this._results.push(packet);
    this._fields.push(undefined);
  }

  this._index++;
  this._handleFinalResultPacket(packet);
}