function(packet) {
  var err = Sequence.packetToError(packet, true);
  err.fatal = true;
  this.end(err);
}