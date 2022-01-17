function(test) {
  // debug("=========================================== shouldWorkCorrectlyWithInserts")
  // Replica configuration
  var replSet = new ReplSetServers( [
      new Server( RS.host, RS.ports[1], { auto_reconnect: true } ),
      new Server( RS.host, RS.ports[0], { auto_reconnect: true } ),
      new Server( RS.host, RS.ports[2], { auto_reconnect: true } )
    ],
    {rs_name:RS.name}
  );

  // Insert some data
  var db = new Db('integration_test_', replSet, {numberOfRetries:20, retryMiliSeconds:5000});
  // Print any errors
  db.on("error", function(err) {
    console.log("============================= ensureConnection caught error")
    console.dir(err)
    if(err != null && err.stack != null) console.log(err.stack)
    db.close();
  })
  // Open db
  db.open(function(err, p_db) {
    // Check if we got an error
    if(err != null) debug("shouldWorkCorrectlyWithInserts :: " + inspect(err));

    // Drop collection on replicaset
    p_db.dropCollection('shouldCorrectlyQueryAfterPrimaryComesBackUp', function(err, r) {
      if(err != null) debug("shouldWorkCorrectlyWithInserts :: " + inspect(err));
      // Recreate collection on replicaset
      p_db.createCollection('shouldCorrectlyQueryAfterPrimaryComesBackUp', function(err, collection) {
        if(err != null) debug("shouldWorkCorrectlyWithInserts :: " + inspect(err));
        // Insert a dummy document
        collection.insert({a:20}, {safe: {w:'majority', wtimeout: 10000}}, function(err, r) {
          // Kill the primary
          RS.killPrimary(9, {killNodeWaitTime:0}, function(node) {
            console.log("============================================================= KILL")
            // Ok let's execute same query a couple of times
            collection.find({}).toArray(function(err, items) {
              test.ok(err != null);
              test.equal("connection closed", err.message);

              collection.find({}).toArray(function(err, items) {
                test.ok(err != null);
                // console.log("================================================================== 1")
                // console.dir(err)
                // console.dir(items)

                // test.ok(err == null);
                // test.equal(1, items.length);

                collection.find({}).toArray(function(err, items) {
                  // console.log("================================================================== 2")
                  // console.dir(err)
                  // console.dir(items)

                  test.ok(err == null);
                  test.equal(1, items.length);
                  p_db.close();
                  test.done();
                });
              });
            });
          });
        });
      });
    });
  });
}