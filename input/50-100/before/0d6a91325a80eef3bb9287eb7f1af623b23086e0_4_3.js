function() {
  if (!this.paused) {
    return;
  }

  this.paused = false;

  if (this.remoteId === null) {
    return;
  }

  this.log.debug('Send stream resume');

  var packet = this.createPacket(BesioStream.TYPE_RESUME, 0);
  this.client.sendPacket(packet);
}