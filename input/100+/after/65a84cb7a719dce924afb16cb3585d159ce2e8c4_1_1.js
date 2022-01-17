function() {
    it('can disconnect before connection is established', function(done) {
      server.createServer(++port, function(srv) {
        var ws = new WebSocket('ws://localhost:' + port);
        ws.terminate();
        ws.on('open', function() {
          assert.fail('connect shouldnt be raised here');
        });
        ws.on('close', function() {
          srv.close();
          done();
        });
      });
    });

    it('can close before connection is established', function(done) {
      server.createServer(++port, function(srv) {
        var ws = new WebSocket('ws://localhost:' + port);
        ws.close(1001);
        ws.on('open', function() {
          assert.fail('connect shouldnt be raised here');
        });
        ws.on('close', function() {
          srv.close();
          done();
        });
      });
    });

    it('invalid server key is denied', function(done) {
      server.createServer(++port, server.handlers.invalidKey, function(srv) {
        var ws = new WebSocket('ws://localhost:' + port);
        ws.on('error', function() {
          srv.close();
          done();
        });
      });
    });

    it('close event is raised when server closes connection', function(done) {
      server.createServer(++port, server.handlers.closeAfterConnect, function(srv) {
        var ws = new WebSocket('ws://localhost:' + port);
        ws.on('close', function() {
          srv.close();
          done();
        });
      });
    });

    it('error is emitted if server aborts connection', function(done) {
      server.createServer(++port, server.handlers.return401, function(srv) {
        var ws = new WebSocket('ws://localhost:' + port);
        ws.on('open', function() {
          assert.fail('connect shouldnt be raised here');
        });
        ws.on('error', function() {
          srv.close();
          done();
        });
      });
    });
  }