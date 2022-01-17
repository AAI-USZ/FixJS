function Socket(type, listener) {
  events.EventEmitter.call(this);

  //init state variables
  this._listening = false;
  this._binding   = false;
  this._connected = false;
  this._socketID  = null;
  //type of socket 'udp4', 'udp6', 'unix_socket'
  this.type = type || 'udp4';
  this._port = 0;

  this._targetAddress = null;
  this._targetPort = null;

  //listener
  if (typeof listener === 'function')
    this.on('message', listener);

  console.log("Creating UDP socket");

  var self = this;
  socket.create("udp", {
  	//socket options though i can't find any
  }, function(createInfo){

  	self._socketID = createInfo.socketId;
    self.emit("created");
    console.log("created UDP socket")
  })
  // this.sio = io.connect(host, io_options);
}