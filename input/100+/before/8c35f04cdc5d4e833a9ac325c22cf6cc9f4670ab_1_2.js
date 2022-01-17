function connect(/*port, host, callback*/) {
  var args = Array.prototype.slice.call(arguments),
      self = this,
      callback,
      host,
      port;

  args.forEach(function handle(arg) {
    var type = typeof arg;
    switch (type) {
      case 'number':
        port = arg;
        break;
      case 'string':
        host = arg;
        break;
      case 'function':
        callback = arg;
        break;
      default:
        self.emit('error', new Error('bad argument to connect'));
        break;
    }
  });

  host = host || '127.0.0.1';
  this.port = port || this.port;
  this.host = host || this.host;
  args = this.port ? [this.port, this.host] : [this.host];
  
  if (callback) {
    args.push(callback);
  }
  
  if (['tcp4', 'tls'].indexOf(this._type) === -1) {
    return this.emit('error', new Error('Unknown Socket Type'));
  }

  var errHandlers = self.listeners('error');

  if (errHandlers.length > 0) {
    //
    // copy the last error from nssocker onto the error event.
    //
    self.socket._events.error = errHandlers[errHandlers.length-1];
  }

  this.connected = true;
  this.socket.connect.apply(this.socket, args);
}