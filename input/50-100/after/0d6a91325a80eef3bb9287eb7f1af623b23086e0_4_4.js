function(data) {
  if (data) {
    this.write(data);
  }

  debug('Sending stream end')

  var packet = this.createPacket(BesioStream.TYPE_END, 0);
  this.client.sendPacket(packet);

  this.destroySoon();
}