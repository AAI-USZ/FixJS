function(callback) {
  Shard = new ShardedManager({
    // A single replicaset in our sharded system
    numberOfReplicaSets:2,
    replPortRangeSet:30000,
    // A single configuration server
    numberOfConfigServers:1,
    configPortRangeSet:40000,
    // Two mongos proxies to ensure correct failover
    numberOfMongosServers:2,
    mongosRangeSet:50000,    
    // Collection and shard key setup
    db:"sharded_test_db",
    collection:"sharded_test_db_collection",
    shardKey: "_id",      
    // Additional settings
    replicasetOptions: [
      {tags: [{"dc1":"ny"}, {"dc2":"sf"}]},
      {tags: [{"dc1":"ny"}, {"dc2":"sf"}]}
    ]
  })
    
  // Start the shard
  Shard.start(function(err, result) {
    callback();
  });
}