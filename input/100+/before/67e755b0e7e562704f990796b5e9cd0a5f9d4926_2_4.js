function (err) {
      log.error("error connecting server (" + err+")");

      if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
        if (self.mode === global.modes[3] ) { //hub_peer mode
          self.mode = global.modes[2]; // Go in peer mode
                // state will be peer mode state
        } else if (self.mode === global.modes[1] ) { //hub mode
          self.state = global.states[0]; // not connected
        }        
      } else {
        self.mode = global.modes[1];
        self.state = global.states[0];
      }
      // Special case if started in hub disconnected mode
      if (self.webServerState !== global.states[2]) {
        pzpWebSocket.startPzpWebSocketServer(self, self.inputConfig, function() {
          self.rpcHandler.setSessionId(self.sessionId);
          setupMessageHandler(self);
          self.connectedApp();
          log.info("started pzp");
          self.webServerState = global.states[2];
        });
      }
      log.info("pzp mode " + self.mode + " and state is " + self.state);
    }