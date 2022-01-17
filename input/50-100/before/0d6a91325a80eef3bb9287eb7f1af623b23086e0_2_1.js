function OutgoingPacket(client, type, length) {
  if (length > OutgoingPacket.MAX_SIZE) {
    throw new Error('Packet to big');
  }

  Buffer.call(this, length + 3);
  this.writeUInt16BE(length+1, 0);
  this.writeUInt8(type, 2);
  this.index = 3;
  this.packetType = type;
  this.client = client;
}