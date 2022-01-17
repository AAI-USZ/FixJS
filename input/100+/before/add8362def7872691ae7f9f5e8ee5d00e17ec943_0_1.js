function(servers, options) {
  this.count = 0;

  // Set up basic
  if(!(this instanceof ReplSet))
    return new ReplSet(servers, options);

  // Set up event emitter
  EventEmitter.call(this);

  // Ensure no Mongos's
  for(var i = 0; i < servers.length; i++) {
    if(!(servers[i] instanceof Server)) throw new Error("list of servers must be of type Server");
  }

  // Just reference for simplicity
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
  this.poolSize = this.options.poolSize == null ? 5 : this.options.poolSize;
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

  // Validate correctness of Read preferences
  if(readPreference != null) {
    if(readPreference != ReadPreference.PRIMARY && readPreference != ReadPreference.PRIMARY_PREFERRED
      && readPreference != ReadPreference.SECONDARY && readPreference != ReadPreference.SECONDARY_PREFERRED
      && readPreference != ReadPreference.NEAREST && typeof readPreference != 'object' && readPreference['_type'] != 'ReadPreference') {
      throw new Error("Illegal readPreference mode specified, " + readPreference);
    }

    this._readPreference = readPreference;
  } else {
    this._readPreference = null;
  }

  // Strategy for picking a secondary
  this.secondaryAcceptableLatencyMS = this.options['secondaryAcceptableLatencyMS'] == null ? 15 : this.options['secondaryAcceptableLatencyMS'];
  this.strategy = this.options['strategy'];
  // Make sure strategy is one of the two allowed
  if(this.strategy != null && (this.strategy != 'ping' && this.strategy != 'statistical')) throw new Error("Only ping or statistical strategies allowed");
  // Let's set up our strategy object for picking secodaries
  if(this.strategy == 'ping') {
    // Create a new instance
    this.strategyInstance = new PingStrategy(this, this.secondaryAcceptableLatencyMS);
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

  // Enabled ha
  this.haEnabled = this.options['ha'] == null ? true : this.options['ha'];
  // How often are we checking for new servers in the replicaset
  this.replicasetStatusCheckInterval = this.options['haInterval'] == null ? 1000 : this.options['haInterval'];
  this._replicasetTimeoutId = null;
  // Connection timeout
  this._connectTimeoutMS = 1000;
  // Current list of servers to test
  this.pingCandidateServers = [];

  // Last replicaset check time
  this.lastReplicaSetTime = new Date().getTime();
  this.haProcessInProgress = false;
}