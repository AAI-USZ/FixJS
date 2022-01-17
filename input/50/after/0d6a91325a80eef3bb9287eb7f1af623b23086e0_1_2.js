function(buffer) {
    debug('Socket data event')
    new IncomingPacket(self, buffer)
  }