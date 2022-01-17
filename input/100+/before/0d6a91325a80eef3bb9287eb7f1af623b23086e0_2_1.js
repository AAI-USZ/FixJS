function IncomingPacket(client, buffer) {
  if (!(this instanceof IncomingPacket)) { return new IncomingPacket(client, buffer); }

  this.client = client;
  BitWorker.call(this, buffer);
  this.readStart();

  this.type = this.readUInt8();

  switch(this.type) {
  case packets.TYPE_HANDSHAKE:
    this.handleHandshake();
    break;
  case packets.TYPE_ERROR:
    this.handleError();
    break;
  case packets.TYPE_CALLBACK:
    this.handleCallback();
    break;
  case packets.TYPE_MESSAGE:
    this.handleMessage();
    break;
  case packets.TYPE_EVENT:
    this.handleEvent();
    break;
  case packets.TYPE_STREAM:
    this.handleStream();
    break;
  case packets.TYPE_CALLBACK_GC:
    this.handleCallbackGc();
    break;
  default:
    this.client.log.error('Invalid packet');
    break;
  }

}