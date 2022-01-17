function onConnect(data) {
    debug('Connected, starting handshake')
    var packet = new OutgoingPacket(self, packets.TYPE_HANDSHAKE, binson.calculate(data))
    packet.writeBinson(data)
    self.sendPacket(packet)
  }