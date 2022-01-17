function(ws) {
    self.ws = ws;
    self.protocolVersion = 'hybi-' + ws.protocolVersion;

    ws.on('message', function(message) {
      self.onMessage(message);
    });
    ws.on('close', function () {
      self.end();
    });
    ws.on('error', function (reason) {
      debug(self.name + ' parser error: ' + reason);
      self.end();
    });

    process.nextTick(function() {
      if ('opening' == self.readyState) {
        self.readyState = 'open';
        self.emit('open');
      }
    });
  }