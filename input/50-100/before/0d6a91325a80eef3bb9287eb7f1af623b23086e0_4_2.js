function() {
  if (this.paused) {
    return;
  }

  this.paused = true;

  if (this.remoteId === null) {
    return;
  }

  this.log.debug('Send stream pause');

  var packet = this.createPacket(BesioStream.TYPE_PAUSE, 0);
  this.client.sendPacket(packet);
}