function(packet) {
  var err = Sequence.packetToError(packet);
  this.end(err);
}