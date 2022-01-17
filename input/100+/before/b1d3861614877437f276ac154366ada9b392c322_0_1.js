function() {
  // If we have a normal connection
  if(this.socketOptions.ssl) {
    // Create a new stream
    this.connection = new net.Socket();    
    // Set options on the socket
    this.connection.setTimeout(this.socketOptions.timeout);
    // Work around for 0.4.X
    if(process.version.indexOf("v0.4") == -1) this.connection.setNoDelay(this.socketOptions.noDelay);
    // Set keep alive if defined
    if(process.version.indexOf("v0.4") == -1) {
      if(this.socketOptions.keepAlive > 0) {
        this.connection.setKeepAlive(true, this.socketOptions.keepAlive);
      } else {
        this.connection.setKeepAlive(false);
      }         
    }
    
    // Set up pair for tls with server, accept self-signed certificates as well
    var pair = this.pair = tls.createSecurePair(false);
    // Set up encrypted streams
    this.pair.encrypted.pipe(this.connection);
    this.connection.pipe(this.pair.encrypted);
    
    // Setup clearText stream
    this.writeSteam = this.pair.cleartext;
    // Add all handlers to the socket to manage it
    this.pair.on("secure", connectHandler(this));
    this.pair.cleartext.on("data", createDataHandler(this));
    // Add handlers
    this.connection.on("error", errorHandler(this));
    // this.connection.on("connect", connectHandler(this));
    this.connection.on("end", endHandler(this));
    this.connection.on("timeout", timeoutHandler(this));
    this.connection.on("drain", drainHandler(this));
    this.writeSteam.on("close", closeHandler(this));
    // Start socket
    this.connection.connect(this.socketOptions.port, this.socketOptions.host);
  } else {
    // Create new connection instance
    this.connection = net.createConnection(this.socketOptions.port, this.socketOptions.host);
    // Set options on the socket
    this.connection.setTimeout(this.socketOptions.timeout);
    // Work around for 0.4.X
    if(process.version.indexOf("v0.4") == -1) this.connection.setNoDelay(this.socketOptions.noDelay);
    // Set keep alive if defined
    if(process.version.indexOf("v0.4") == -1) {
      if(this.socketOptions.keepAlive > 0) {
        this.connection.setKeepAlive(true, this.socketOptions.keepAlive);
      } else {
        this.connection.setKeepAlive(false);
      }         
    }

    // Set up write stream
    this.writeSteam = this.connection;
    // Add handlers
    this.connection.on("error", errorHandler(this));
    // Add all handlers to the socket to manage it
    this.connection.on("connect", connectHandler(this));
    // this.connection.on("end", endHandler(this));
    this.connection.on("data", createDataHandler(this));
    this.connection.on("timeout", timeoutHandler(this));
    this.connection.on("drain", drainHandler(this));
    this.connection.on("close", closeHandler(this));
  }  
}