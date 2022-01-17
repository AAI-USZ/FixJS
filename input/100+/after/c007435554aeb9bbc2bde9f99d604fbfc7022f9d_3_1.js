function(test) {
  var closedCalled = false;
  var openCalled = false

  // Add a open listener
  client.once("open", function(err) {
    openCalled = true;
  })

  // Add a close listener
  client.once("close", function(err) {
    closedCalled = true;
  })

  var serverManager = new ServerManager({auth:false, purgedirectories:true, journal:true})
  // Kill the server
  serverManager.killAll(function() {

    // Restart the server
    serverManager.start(true, function() {
      test.equal(true, closedCalled);

      // Attempt to connect again
      client.open(function(err, result) {
        test.equal(null, err)
        test.equal(true, openCalled);
        test.done();
      })
    });
  });
}