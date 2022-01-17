function(data) {
  debug('Handshake authorized');
  this.authorized = true;

  this.packetQueue.forEach(this.sendPacket.bind(this))
  this.packetQueue.length = 0

  if (this.server) {
    this.server.emit('client', this, data);
  }

  this.emit('connect', data);
}