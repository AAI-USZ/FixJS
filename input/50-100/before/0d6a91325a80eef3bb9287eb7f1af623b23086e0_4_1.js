function(data) {
  var packet = this.createPacket(BesioStream.TYPE_DATA, binson.calculate(data));
  packet.writeBinson(data);

  this.log.debug('Send stream data');

  return this.client.sendPacket(packet);
}