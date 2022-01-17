function(port, address) {
  var self = this;

  if(this._listening)
    throw new Error('already listening');

  if(this._binding)
    throw new Error('already binding');
  
  this._binding = true;

  // this.sio.emit('bind', {
  //   type    : this.type,
  //   port    : port,
  //   address : address
  // });

  // this.sio.on('listening', function(address) {
  //   //set address
  //   self._address = address;

  //   self._binding = false;
  //   self._listening = true;

  //   self.emit('listening');
    
  //   //proxy incoming messages
  //   self.sio.on('dgram-message', function(message) {
  //     self.emit('message',
  //       new Buffer(message.msg, 'ascii'),
  //       message.rinfo);
  //   });

  //   //proxy error
  //   self.sio.on('error', function(error) {
  //     self.emit('error', error);
  //   });

  //   //disconnection
  //   self.sio.on('disconnect', function() {
  //     self.emit('close');
  //     self.removeAllListeners();
  //   });
  // });
}