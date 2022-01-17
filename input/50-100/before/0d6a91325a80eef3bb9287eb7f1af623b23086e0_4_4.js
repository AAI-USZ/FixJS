function(data) {
  if (data) {
    this.write(data);
  }

  this.log.debug('Send stream end');

  var packet = this.createPacket(BesioStream.TYPE_END, 0);
  this.client.sendPacket(packet);

  this.destroySoon();
}