function(packet) {
  var err = this._packetToError(packet);
  err.fatal = true;
  this.end(err);
}