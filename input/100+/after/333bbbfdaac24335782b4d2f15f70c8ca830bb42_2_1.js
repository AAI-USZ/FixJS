function Server(host, port, options) {
  // Set up event emitter
  EventEmitter.call(this);  
  // Set up Server instance
  if(!(this instanceof Server)) return new Server(host, port, options);
  
  var self = this;
  this.host = host;
  this.port = port;
  this.options = options == null ? {} : options;
  this.internalConnection;
  this.internalMaster = false;
  this.connected = false;
  this.poolSize = this.options.poolSize == null ? 1 : this.options.poolSize;
  this.ssl = this.options.ssl == null ? false : this.options.ssl;
  this.slaveOk = this.options["slave_ok"];
  this._used = false;
  
  // Get the readPreference
  var readPreference = this.options['readPreference'];  
  // Read preference setting
  if(readPreference != null) {
    if(readPreference != Server.READ_PRIMARY && readPreference != Server.READ_SECONDARY_ONLY
      && readPreference != Server.READ_SECONDARY) {
        throw new Error("Illegal readPreference mode specified, " + readPreference);
    }
    
    // Set read Preference
    this._readPreference = readPreference;
  } else {
    this._readPreference = null;        
  }
  
  // Contains the isMaster information returned from the server
  this.isMasterDoc;

  // Set default connection pool options
  this.socketOptions = this.options.socketOptions != null ? this.options.socketOptions : {};
  // Set ssl up if it's defined
  if(this.ssl) {
    this.socketOptions.ssl = true;
  }
  
  // Set up logger if any set
  this.logger = this.options.logger != null 
    && (typeof this.options.logger.debug == 'function') 
    && (typeof this.options.logger.error == 'function') 
    && (typeof this.options.logger.log == 'function') 
      ? this.options.logger : {error:function(message, object) {}, log:function(message, object) {}, debug:function(message, object) {}};

  // Just keeps list of events we allow
  this.eventHandlers = {error:[], parseError:[], poolReady:[], message:[], close:[], timeout:[]};
  // Internal state of server connection
  this._serverState = 'disconnected';
  // this._timeout = false;
  // Contains state information about server connection
  this._state = {'runtimeStats': {'queryStats':new RunningStats()}};  
  // Do we record server stats or not
  this.recordQueryStats = false;  
}