function onConnect() {
    debug('Connected, starting handshake')
    var packet = new OutgoingPacket(self, packets.TYPE_HANDSHAKE, binson.calculate(options.handshake))
    packet.writeBinson(options.handshake)
    self.sendPacket(packet)
  }