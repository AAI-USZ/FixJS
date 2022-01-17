function(events, util){
	var exports = {};
  var socket = chrome.socket || chrome.experimental.socket;
  socket.ondata = function(result){
    console.log("got a result now where does this go", result)
  }
//var io     = require('socket.io-client');
//var Buffer = require('buffer').Buffer;

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
util.inherits(Socket, events.EventEmitter);

exports.Socket = Socket;
exports.createSocket = function(type, listener) {
  return new Socket(type, listener);
};

Socket.prototype._poll = function(){
  var self = this;
  socket.read(this._socketID, function(result){
    console.log("read a result", result);
    if(result.resultCode > 0){
      socket.ondata(result);
    }
    self._poll();
  })
}

Socket.prototype._connect = function(port, address, callback) {
  var self = this;
  if(this._socketID === null){
    var args = arguments;
    console.log("can't send yet, waiting till udp socket created")
    return self.on("created", function(){
      self._connect.apply(self, args);
    })
  }
  //TODO: check to see if port and address have changed 
  if(this._connected == false){
    socket.connect(this._socketID, address, port, function(connectResult){
      console.debug("connectResult", connectResult === 0) 
      self._connected = true;
      self._poll();
      callback();
    })
  }else{
    callback();
  }
  
};

Socket.prototype.bind = function(port, address) {
  var self = this;

  if(this._listening)
    throw new Error('already listening');

  if(this._binding)
    throw new Error('already binding');
  
  if(this._socketID === null){
    return self.on("created", function(){
      self.bind(port, address)
    })
  }

  this._binding = true;

  address = address || '0.0.0.0';
  port = port || 0;

  this._port = port;
  console.log("binding", this._socketID, address, port)
  socket.bind(this._socketID, address, port, function(result){
    //console.log("I don't know what this integer result means after binding", result);
    if(result < 0){
      console.error("OH NOES COULD NOT BIND SOCKET!")
    }
    self._binding = false;
    self._listening = true;
    self.emit('listening');

  })

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
};

Socket.prototype.send = function(buffer, offset, length, port, address, callback) {
  var self = this;
  console.log("UDP dgrams send", arguments)
  


  //accept buffer as string
  buffer = (typeof buffer === 'string') ? new Buffer(buffer) : buffer;


  //emit directly exception if any
  if (offset >= buffer.length)
    throw new Error('Offset into buffer too large');
  if (offset + length > buffer.length)
    throw new Error('Offset + length beyond buffer length');

  //console.log("what is this buff", buffer)

  self._connect(port, address, function(){
    //console.log(buffer.toString('utf8').length)
    var ab = buffer.toArrayBuffer() //new Uint8Array(buffer.length);
    console.log(new Uint8Array(ab));
    //ab.set(buffer.parent.subarray(buffer.offset, buffer.offset + buffer.length), 0)
    //var ab = buffer.parent.buffer //(new Uint8Array(buffer)).buffer
    //var ab = (new Uint8Array("hello world".split('').map(function(e){return e.charCodeAt(0)}))).buffer;
    console.log([].slice.call((new Uint8Array(ab)), 0))
    socket.write(self._socketID, ab, function(sendResult){
      console.debug("sendResult", sendResult);
    })
  })

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
};


Socket.prototype.close = function() {
  // this.sio.disconnect();
  this.emit('close');
  this.removeAllListeners();
};


Socket.prototype.address = function() {
  return {
    address: "0.0.0.0",
    family: "IPv4",
    port: this._port
  }
};


// not implemented methods

Socket.prototype.setBroadcast = function(arg) {
  throw new Error('not implemented');
};

Socket.prototype.setTTL = function(arg) {
  throw new Error('not implemented');
};

Socket.prototype.setMulticastTTL = function(arg) {
  throw new Error('not implemented');
};

Socket.prototype.setMulticastLoopback = function(arg) {
  throw new Error('not implemented');
};

Socket.prototype.addMembership = function(multicastAddress, nterfaceAddress) {
  throw new Error('not implemented');
};

Socket.prototype.dropMembership = function(multicastAddress, interfaceAddress) {
  throw new Error('not implemented');
};
	return exports;
}