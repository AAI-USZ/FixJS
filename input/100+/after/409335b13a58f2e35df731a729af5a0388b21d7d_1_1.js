function(conn) {
    self.ws = conn;
    self.protocolVersion = 'hybi-' + conn.protocolVersion;

    conn.on('message', function(message) {
      self.onMessage(message);    
    });
    conn.on('close', function () {
      self.end();
    });
    conn.on('error', function (reason) {
      debug(self.name + ' parser error: ' + reason);
      self.end();
    });

    process.nextTick(function () {
      if ('opening' == self.readyState && ws.OPEN == conn.readyState) {
        self.readyState = 'open';
        self.emit('open');
      }
    });
  }