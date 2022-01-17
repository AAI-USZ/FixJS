function(buffer, offset, length, port, address, callback) {
  var self = this;

  //we are not listening : bind and then send when listening
  if(!this._listening) {
    if(!this._binding)
      this.bind();

    this.once('listening', function() {
      self.send.apply(this, arguments);
    });
    return;
  }

  //accept buffer as string
  buffer = (typeof buffer === 'string') ? new Buffer(buffer) : buffer;

  //emit directly exception if any
  if (offset >= buffer.length)
    throw new Error('Offset into buffer too large');
  if (offset + length > buffer.length)
    throw new Error('Offset + length beyond buffer length');

  //send it on wire
  // this.sio.emit('dgram-message', {
  //   buffer  : buffer.toString('ascii'),
  //   offset  : offset,
  //   length  : length,
  //   port    : port,
  //   address : address
  // });

  if(callback)
    callback.call(null);
}