function() {
  if (!this.paused) {
    return;
  }

  this.paused = false;

  if (this.remoteId === null) {
    return;
  }

  debug('Sending stream resume')

  var packet = this.createPacket(BesioStream.TYPE_RESUME, 0);
  this.client.sendPacket(packet);
}