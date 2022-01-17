function (socket, options) {
  if (!(this instanceof NsSocket)) {
    return new NsSocket(socket, options);
  }

  //
  // If there is no Socket instnace to wrap,
  // create one.
  //
  if (!options) {
    options = socket;
    socket = common.createSocket(options);
  }
 
  //
  // Options should be
  //
  //    { 
  //      type : 'tcp' or 'tls',
  //      delimiter : '::', delimiter that separates between segments
  //      msgLength : 3 //number of segments in a complete message
  //    }
  //
  options = options || {};  
 
  var self = this,
      startName;

  //
  // Setup underlying socket state.
  //
  this.socket     = socket;
  this.connected  = options.connected || socket.writable && socket.readable || false;
  
  //
  // Setup reconnect options.
  //
  this._reconnect = options.reconnect  || false;
  this.retry      = {
    retries:  0,
    max:      options.maxRetries || 10,
    interval: options.retryInterval || 5000,
    wait:     options.retryInterval || 5000
  };
    
  //
  // Setup default instance variables.
  //
  this._options   = options;
  this._type      = options.type || 'tcp4',
  this._delimiter = options.delimiter || '::';

  events2.EventEmitter2.call(this, {
    delimiter: this._delimiter,
    wildcard: true,
    maxListeners: options.maxListeners || 10
  });

  // Initializing parsing holders
  this._eventLength = -1;
  this._messageLength = -1;
  this._messagetype = 0;
  this._bufferJoiner = new BufferJoiner();

  this._setup();
}