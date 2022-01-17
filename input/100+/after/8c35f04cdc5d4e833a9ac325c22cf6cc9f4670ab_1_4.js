function () {
  var self = this,
      startName;
  //
  // Because of how the code node.js `tls` module works, we have
  // to separate some bindings. The main difference is on
  // connection, some socket activities.
  //
  if (this._type === 'tcp4') {
    startName = 'connect';

    this.socket.on('data', this._onData.bind(this));
    // this.socket.on('data', );

    // create a stub for the setKeepAlive functionality
    this.setKeepAlive = function () {
      self.socket.setKeepAlive.apply(self.socket, arguments);
    };
  }
  else if (this._type === 'tls') {
    startName = 'secureConnection';
    this.socket.once('connect', function () {
      console.log('secureConnection')
      self.socket.cleartext.on('data', self._onData.bind(self));
    });

    // create a stub for the setKeepAlive functionality
    this.setKeepAlive = function () {
      self.socket.socket.setKeepAlive.apply(self.socket.socket, arguments);
    };
  }
  else {
    // bad arguments, so throw an error
    this.emit('error', new Error('Bad Option Argument [type]'));
    return null;
  }

  // make sure we listen to the underlying socket
  this.socket.on(startName, this._onStart.bind(this));
  this.socket.on('close',   this._onClose.bind(this));

  if (this.socket.socket) {
    //
    // otherwise we get a error passed from net.js
    // they need to backport the fix from v5 to v4
    //
    this.socket.socket.on('error', this._onError.bind(this));
  }

  this.socket.on('error',   this._onError.bind(this));
  this.socket.on('timeout', this._onIdle.bind(this));
}