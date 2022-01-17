function(host, port, poolSize, bson, socketOptions) {
  if(typeof host !== 'string' || typeof port == undefined) throw "host and port must be specified [" + host + ":"  + port + "]";
  // Set up event emitter
  EventEmitter.call(this);  
  // Keep all options for the socket in a specific collection allowing the user to specify the 
  // Wished upon socket connection parameters
  this.socketOptions = typeof socketOptions === 'object' ? socketOptions : {};
  this.socketOptions.host = host;
  this.socketOptions.port = port;
  this.bson = bson;
  // PoolSize is always + 1 for special reserved "measurment" socket (like ping, stats etc)
  this.poolSize = poolSize;
  this.minPoolSize = Math.floor(this.poolSize / 2) + 1;
  
  // Set default settings for the socket options
  utils.setIntegerParameter(this.socketOptions, 'timeout', 0);
  // Delay before writing out the data to the server
  utils.setBooleanParameter(this.socketOptions, 'noDelay', true);
  // Delay before writing out the data to the server
  utils.setIntegerParameter(this.socketOptions, 'keepAlive', 0);
  // Set the encoding of the data read, default is binary == null
  utils.setStringParameter(this.socketOptions, 'encoding', null);
  // Allows you to set a throttling bufferSize if you need to stop overflows
  utils.setIntegerParameter(this.socketOptions, 'bufferSize', 0);  
  
  // Internal structures
  this.openConnections = [];  
  // Assign connection id's
  this.connectionId = 0;
  
  // Current index for selection of pool connection
  this.currentConnectionIndex = 0;
  // The pool state
  this._poolState = 'disconnected';  
  // timeout control
  this._timeout = false;
}