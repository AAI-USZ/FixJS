function (configure, conn_key, conn_csr) {
      if (configure === "undefined") {
        log.error("pzp configuration could not be loaded");
      } 
      self.checkMode(configure);
      if (self.mode === global.modes[0]) { // VIRGIN MODE
        if (!checkConfiguration(self.inputConfig, configure)) {
          callback("undefined");
        } 
      } 
      
      
      self.config = configure;

      if (self.mode === global.modes[0]) { //Virgin
        self.sessionId = configure.name;
      } else {
        self.sessionId = configure.pzhId + '/' + configure.name;
      }

      try {
        self.states = global.states[1];
        session.common.resolveIP(config.pzhHost, function(resolvedAddress) {
          log.info("connecting Address: " + resolvedAddress);
          self.address = resolvedAddress;
          self.connect(conn_key, conn_csr, config.code, function(result) {
            if(result === "startedPZP" && self.webServerState !== global.states[2]) {
              pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                self.update(callback);
              });
            } else if(result === "startPZPAgain") {
              self.connect(conn_key, null, null, function(result){
                if (result === "startedPZP" && self.webServerState !== global.states[2]) {
                  console.log(self.webServerState);
                  pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                    self.update(callback);
                  });
                }
              });
            }
          });
        });
      } catch (err) {
        log.error("failed Starting PZP in Hub Mode");
        self.state = global.states[0];
        callback.call(self, "failedStarting", self);
        return;
      }
    }