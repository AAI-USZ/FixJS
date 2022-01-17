function(test) {
  var closedCalled = false;
  // Add a listener
  client.once("close", function(err) {
    closedCalled = true;
  })

  var serverManager = new ServerManager({auth:false, purgedirectories:true, journal:true})
  // Kill the server
  serverManager.killAll(function() {

    // Restart the server
    serverManager.start(true, function() {
      test.equal(true, closedCalled);
      test.done();
    });
  });
}