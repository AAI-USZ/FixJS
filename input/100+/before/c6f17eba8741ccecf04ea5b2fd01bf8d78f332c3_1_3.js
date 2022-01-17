function(test) {
  var db = new Db(MONGODB, new Server("127.0.0.1", 27017, {auto_reconnect: true, poolSize: 4, ssl:useSSL}), {native_parser: (process.env['TEST_NATIVE'] != null)});
  db.open(connectionTester(test, 'testCloseNoCallback', function() {
    var dbCloseCount = 0, connectionCloseCount = 0, poolCloseCount = 0;
    // Ensure no close events are fired as we are closing the connection specifically
    db.on('close', function() { dbCloseCount++; });

    var connectionPool = db.serverConfig.connectionPool;
    var connections = connectionPool.getAllConnections();

    // Force the connection close, should not trigger close command
    db.serverConfig.connectionPool.stop();
    // Test done
    test.equal(0, dbCloseCount);
    test.done();
  }));
}