function Socket(type, listener, host, io_options) {
  events.EventEmitter.call(this);

  //init state variables
  this._listening = false;
  this._binding   = false;

  //type of socket 'udp4', 'udp6', 'unix_socket'
  this.type = type || 'udp4';

  //listener
  if (typeof listener === 'function')
    this.on('message', listener);

  //args swap
  if(typeof listener === 'string') {
    host = listener;
    io_options = host;
  }

  io_options = io_options || {};

  //use sio manespaceing
  host = (host || '') + '/simudp';

  //connect socket.io
  // this.sio = io.connect(host, io_options);
}