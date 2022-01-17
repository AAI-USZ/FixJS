function(servers, options) {
  // Set up basic
  if(!(this instanceof ReplSet))
    return new ReplSet(servers, options);

  // Set up event emitter
  EventEmitter.call(this);

  var self = this;
  // Contains the master server entry
  this.options = options == null ? {} : options;
  this.reconnectWait = this.options["reconnectWait"] != null ? this.options["reconnectWait"] : 1000;
  this.retries = this.options["retries"] != null ? this.options["retries"] : 30;
  this.replicaSet = this.options["rs_name"];

  // Are we allowing reads from secondaries ?
  this.readSecondary = this.options["read_secondary"];
  this.slaveOk = true;
  this.closedConnectionCount = 0;
  this._used = false;  

  // Default poolSize for new server instances
  this.poolSize = this.options.poolSize == null ? 1 : this.options.poolSize;
  this._currentServerChoice = 0;

  // Set up ssl connections
  this.ssl = this.options.ssl == null ? false : this.options.ssl;

  // Just keeps list of events we allow
  this.eventHandlers = {error:[], parseError:[], poolReady:[], message:[], close:[], timeout:[]};
  // Internal state of server connection
  this._serverState = 'disconnected';
  // Read preference
  this._readPreference = null;
  // Number of initalized severs
  this._numberOfServersLeftToInitialize = 0;
  // Do we record server stats or not
  this.recordQueryStats = false;
    
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
  
  // Strategy for picking a secondary
  // this.strategy = this.options['strategy'] == null ? 'statistical' : this.options['strategy'];  
  this.strategy = this.options['strategy'];
  // Make sure strategy is one of the two allowed
  if(this.strategy != null && (this.strategy != 'ping' && this.strategy != 'statistical')) throw new Error("Only ping or statistical strategies allowed");  
  // Let's set up our strategy object for picking secodaries
  if(this.strategy == 'ping') {
    // Create a new instance
    this.strategyInstance = new PingStrategy(this);
  } else if(this.strategy == 'statistical') {
    // Set strategy as statistical
    this.strategyInstance = new StatisticsStrategy(this);
    // Add enable query information
    this.enableRecordQueryStats(true);
  }  
  
  // Set default connection pool options
  this.socketOptions = this.options.socketOptions != null ? this.options.socketOptions : {};  

  // Set up logger if any set
  this.logger = this.options.logger != null 
    && (typeof this.options.logger.debug == 'function') 
    && (typeof this.options.logger.error == 'function') 
    && (typeof this.options.logger.debug == 'function') 
      ? this.options.logger : {error:function(message, object) {}, log:function(message, object) {}, debug:function(message, object) {}};
  
  // Ensure all the instances are of type server and auto_reconnect is false
  if(!Array.isArray(servers) || servers.length == 0) {
    throw Error("The parameter must be an array of servers and contain at least one server");
  } else if(Array.isArray(servers) || servers.length > 0) {
    var count = 0;
    servers.forEach(function(server) {
      if(server instanceof Server) count = count + 1;
      // Ensure no server has reconnect on
      server.options.auto_reconnect = false;
    });

    if(count < servers.length) {
      throw Error("All server entries must be of type Server");
    } else {
      this.servers = servers;
    }
  }  
  
  // Auto Reconnect property
  Object.defineProperty(this, "autoReconnect", { enumerable: true
    , get: function () {
        return true;
      }
  });

  // Get Read Preference method
  Object.defineProperty(this, "readPreference", { enumerable: true
    , get: function () {
        if(this._readPreference == null && this.readSecondary) {
          return Server.READ_SECONDARY;
        } else if(this._readPreference == null && !this.readSecondary) {
          return Server.READ_PRIMARY;
        } else {
          return this._readPreference;
        }
      }
  });  

  // Db Instances
  Object.defineProperty(this, "dbInstances", {enumerable:true
    , get: function() {
      var servers = this.allServerInstances();
      return servers[0].dbInstances;
    }
  })

  // Auto Reconnect property
  Object.defineProperty(this, "host", { enumerable: true
    , get: function () {
        if (this.primary != null) return this.primary.host;
      }
  });

  Object.defineProperty(this, "port", { enumerable: true
    , get: function () {
        if (this.primary != null) return this.primary.port;
      }
  });

  Object.defineProperty(this, "read", { enumerable: true
    , get: function () {
        return this.secondaries.length > 0 ? this.secondaries[0] : null;
      }
  });

  // Get list of secondaries
  Object.defineProperty(this, "secondaries", {enumerable: true
    , get: function() {              
        var keys = Object.keys(this._state.secondaries);
        var array = new Array(keys.length);
        // Convert secondaries to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.secondaries[keys[i]];
        }
        return array;
      }
  });

  // Get list of all secondaries including passives
  Object.defineProperty(this, "allSecondaries", {enumerable: true
    , get: function() {              
        return this.secondaries.concat(this.passives);
      }
  });

  // Get list of arbiters
  Object.defineProperty(this, "arbiters", {enumerable: true
    , get: function() {
        var keys = Object.keys(this._state.arbiters);
        var array = new Array(keys.length);
        // Convert arbiters to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.arbiters[keys[i]];
        }
        return array;
      }
  });

  // Get list of passives
  Object.defineProperty(this, "passives", {enumerable: true
    , get: function() {
        var keys = Object.keys(this._state.passives);
        var array = new Array(keys.length);
        // Convert arbiters to array
        for(var i = 0; i < keys.length; i++) {
          array[i] = this._state.passives[keys[i]];
        }
        return array;
      }
  });

  // Master connection property
  Object.defineProperty(this, "primary", { enumerable: true
    , get: function () {
        return this._state != null ? this._state.master : null;
      }
  });  
  
  // Enabled ha
  this.haEnabled = this.options['ha'] == null ? false : this.options['ha'];
  // How often are we checking for new servers in the replicaset
  this.replicasetStatusCheckInterval = this.options['haInterval'] == null ? 2000 : this.options['haInterval'];
  this._replicasetTimeoutId = null;
}