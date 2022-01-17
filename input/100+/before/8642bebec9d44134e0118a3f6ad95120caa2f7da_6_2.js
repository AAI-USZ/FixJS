function send(event, data, callback) {
  var dataType = typeof data,
      header = new Buffer(9),
      message;

  // if we aren't connected/socketed, then error
  if (!this.socket || !this.connected) {
    return this.emit('error', new Error('NsSocket: sending on a bad socket'));
  }

  // rebinds
  if (typeof event === 'string') {
    event = event.split(this._delimiter);
  }

  event = Buffer(JSON.stringify(event));

  if (dataType === 'undefined' || dataType === 'function') {
    callback = data;
    data = null;
  }

  if (Buffer.isBuffer(data)) {
    header.writeInt8(1, 8);
  } else {
    data = Buffer(JSON.stringify(data));
    header.writeInt8(0, 8);
  }

  header.writeUInt32BE(event.length, 0);
  header.writeUInt32BE(data.length, 4);

  message = Buffer.concat([header, event, data], 9 + event.length + data.length);

  // now actually write to the socket
  if (this.socket.cleartext) {
    this.socket.cleartext.write(message, callback);
  } else {
    this.socket.write(message, callback);
  }
}