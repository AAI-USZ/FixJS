function() {
  var packet = this;

  var id = packet.readUInt32BE();
  var type = packet.readUInt8();

  var client = packet.client;

  var stream = client.streams[id];

  if (!stream) {
    this.client.log.debug('Got stream packet for unknown stream');
    return;
  }


  switch(type) {

  case BesioStream.TYPE_CREATE:
    this.client.log.debug('Handle stream create packet');
    stream.remoteId = packet.readUInt32BE();
    if (stream.paused) {
      stream.paused = false;
      stream.pause();
    }
    stream.writeQueue();
    break;
  case BesioStream.TYPE_END:
    this.client.log.debug('Handle stream end packet');
    stream.emit('end');
    stream.destroy();
    break;

  case BesioStream.TYPE_PAUSE:
    this.client.log.debug('Handle stream pause packet');
    stream.remotePaused = true;
    break;

  case BesioStream.TYPE_RESUME:
    this.client.log.debug('Handle stream resume packet');
    stream.remotePaused = false;
    stream.writeQueue();
    break;

  case BesioStream.TYPE_DATA:
    this.client.log.debug('Handle stream data packet');
    var data = binson.decodeElement(this, this.read(3)); // LENGTH_TYPE
    stream.emit('data', data);
    break;

  default:
    this.client.log.error('Invalid stream packet');
    break;
  }
}