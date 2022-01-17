function(test) {
  var closedCalled = false;
  // Add a listener
  client.once("close", function(err) {
    closedCalled = true;
  })
  // Start server
  var serverManager = new ServerManager({auth:false, purgedirectories:true, journal:true})
  serverManager.killAll(function() {

    serverManager.start(true, function() {
      test.equal(true, closedCalled);
      test.done();
    });
  });
}