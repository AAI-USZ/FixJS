function ShardedManager(options) {  
  options = options == null ? {} : options;
  // Number of config servers
  this.numberOfConfigServers = options["numberOfConfigServers"] != null ? options["numberOfConfigServers"] : 1;
  if(this.numberOfConfigServers != 1 && this.numberOfConfigServers != 3) throw new Error("Only 1 or 3 config servers can be used");
  // Config Servers port range
  this.configPortRangeSet = options["configPortRangeSet"] != null ? options["configPortRangeSet"] : 40000;
  
  // Number of replicasets in the sharded setup
  this.numberOfReplicaSets = options["numberOfReplicaSets"] != null ? options["numberOfReplicaSets"] : 1;
  // Number of mongo's in the sharded setup
  this.numberOfMongosServers = options["numberOfMongosServers"] != null ? options["numberOfMongosServers"] : 1;
  
  // Set the replicasetPortRange
  this.replPortRangeSet = options["replPortRangeSet"] != null ? options["replPortRangeSet"] : 30000;
  // Set up mongos port range
  this.mongosRangeSet = options["mongosRangeSet"] != null ? options["mongosRangeSet"] : 50000;
  // Database to shard
  this.db = options["db"] != null ? options["db"] : "sharded_test_db";
  // Collection to shard
  this.collection = options["collection"] != null ? options["collection"] : "sharded_test_db_collection";
  // Key to shard on
  this.shardKey = options["shardKey"] != null ? options["shardKey"] : "_id";
  
  // Build a the replicaset instances
  this.replicasetManagers = [];
  this.configServers = [];
  this.mongosProxies = [];
  
  // Set up the server
  var replStarPort = this.replPortRangeSet;
  var configStartPort = this.configPortRangeSet;
  var mongosStartPort = this.mongosRangeSet;
  
  // List of config server urls
  var mongosServerUrls = [];
  
  // Sets up the replicaset managers
  for(var i = 0; i < this.numberOfReplicaSets; i++) {
    // Add a replicaset manager
    this.replicasetManagers.push(new ReplicaSetManager({name:("repl_set" + i), start_port:replStarPort, retries:120, secondary_count:1, passive_count:0, arbiter_count:1}));
    // Add a bunch of numbers to the port
    replStarPort = replStarPort + 10;
  }
  
  // Set up config servers
  for(var i = 0; i < this.numberOfConfigServers; i++) {
    // Add a server manager
    this.configServers.push(new ServerManager({configserver:true, start_port:configStartPort, purgedirectories:true}))
    // Set up the urls
    mongosServerUrls.push("localhost:" + configStartPort);
    // Set up the config
    configStartPort = configStartPort + 1;
  }
  
  // console.log("-------------------------------------------------------------------")
  // console.dir(mongosServerUrls)

  // Set up mongos proxies
  for(var i = 0; i < this.numberOfMongosServers; i++) {
    // Add a server proxy
    this.mongosProxies.push(new MongosManager({start_port:mongosStartPort, configservers:mongosServerUrls, purgedirectories:true}));
    // Set up the config
    mongosStartPort = mongosStartPort + 1;
  }
}