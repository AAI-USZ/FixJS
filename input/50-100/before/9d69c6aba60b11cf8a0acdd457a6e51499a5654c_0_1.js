function(payload) {
  assert(Buffer.isBuffer(payload));
  var len = payload.length;
  var packet = new Buffer(len + 4);
  packet[0] = len >>> 24;
  packet[1] = len >>> 16;
  packet[2] = len >>> 8;
  packet[3] = len &   255;
  payload.copy(packet, 4, 0);
  this.socket.write(packet);
}