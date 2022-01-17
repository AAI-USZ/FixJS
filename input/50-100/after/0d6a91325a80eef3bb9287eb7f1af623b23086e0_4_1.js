function(data) {
  var packet = this.createPacket(BesioStream.TYPE_DATA, binson.calculate(data));
  packet.writeBinson(data);

  debug('Sending stream data')

  return this.client.sendPacket(packet);
}