function Db(databaseName, serverConfig, options) {

  if(!(this instanceof Db)) return new Db(databaseName, serverConfig, options);
  
  EventEmitter.call(this);
  this.databaseName = databaseName;
  this.serverConfig = serverConfig;  
  this.options = options == null ? {} : options;  
  // State to check against if the user force closed db
  this._applicationClosed = false;
  // Fetch the override flag if any
  var overrideUsedFlag = this.options['override_used_flag'] == null ? false : this.options['override_used_flag'];  
  // Verify that nobody is using this config
  if(!overrideUsedFlag && typeof this.serverConfig == 'object' && this.serverConfig._isUsed()) {
    throw new Error("A Server or ReplSet instance cannot be shared across multiple Db instances");
  } else if(!overrideUsedFlag && typeof this.serverConfig == 'object'){
    // Set being used
    this.serverConfig._used = true;    
  }
  
  // Ensure we have a valid db name
  validateDatabaseName(databaseName);
  
  // Contains all the connections for the db
  try {
    this.native_parser = this.options.native_parser;
    // The bson lib
    var bsonLib = this.bsonLib = this.options.native_parser ? require('bson').BSONNative : new require('bson').BSONPure;
    // Fetch the serializer object
    var BSON = bsonLib.BSON;
    // Create a new instance
    this.bson = new BSON([bsonLib.Long, bsonLib.ObjectID, bsonLib.Binary, bsonLib.Code, bsonLib.DBRef, bsonLib.Symbol, bsonLib.Double, bsonLib.Timestamp, bsonLib.MaxKey, bsonLib.MinKey]);
    // Backward compatibility to access types
    this.bson_deserializer = bsonLib;
    this.bson_serializer = bsonLib;
  } catch (err) {
    // If we tried to instantiate the native driver
    var msg = "Native bson parser not compiled, please compile "
            + "or avoid using native_parser=true";
    throw Error(err);
  }

  // Internal state of the server
  this._state = 'disconnected';
  
  this.pkFactory = this.options.pk == null ? bsonLib.ObjectID : this.options.pk;  
  this.forceServerObjectId = this.options.forceServerObjectId != null ? this.options.forceServerObjectId : false;
  // Added strict
  this.strict = this.options.strict == null ? false : this.options.strict;
  this.notReplied ={};
  this.isInitializing = true;
  this.auths = [];
  this.openCalled = false;
  
  // Command queue, keeps a list of incoming commands that need to be executed once the connection is up
  this.commands = [];  
  
  // Contains all the callbacks
  this._callBackStore = new CallbackStore();
  
  // Set up logger
  this.logger = this.options.logger != null 
    && (typeof this.options.logger.debug == 'function') 
    && (typeof this.options.logger.error == 'function') 
    && (typeof this.options.logger.log == 'function') 
      ? this.options.logger : {error:function(message, object) {}, log:function(message, object) {}, debug:function(message, object) {}};
  // Allow slaveOk
  this.slaveOk = this.options["slave_ok"] == null ? false : this.options["slave_ok"];
  
  var self = this;
  // Associate the logger with the server config
  this.serverConfig.logger = this.logger;  
  this.tag = new Date().getTime();  
  // Just keeps list of events we allow
  this.eventHandlers = {error:[], parseError:[], poolReady:[], message:[], close:[]};

  // Controls serialization options
  this.serializeFunctions = this.options.serializeFunctions != null ? this.options.serializeFunctions : false;
  
  // Raw mode
  this.raw = this.options.raw != null ? this.options.raw : false;

  // Record query stats
  this.recordQueryStats = this.options.recordQueryStats != null ? this.options.recordQueryStats : false;
  
  // If we have server stats let's make sure the driver objects have it enabled
  if(this.recordQueryStats == true) {
    this.serverConfig.enableRecordQueryStats(true);
  }
  
  // Reaper enable setting
  this.reaperEnabled = this.options.reaper != null ? this.options.reaper : false;
  this._lastReaperTimestamp = new Date().getTime();
  
  // Retry information
  this.retryMiliSeconds = this.options.retryMiliSeconds != null ? this.options.retryMiliSeconds : 5000;
  this.numberOfRetries = this.options.numberOfRetries != null ? this.options.numberOfRetries : 5;
  
  // Reaper information
  this.reaperInterval = this.options.reaperInterval != null ? this.options.reaperInterval : 10000;
  this.reaperTimeout = this.options.reaperTimeout != null ? this.options.reaperTimeout : 30000;

  // get self
  var self = this;
}