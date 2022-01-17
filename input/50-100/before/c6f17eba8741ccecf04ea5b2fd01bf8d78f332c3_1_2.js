function() {
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
  }