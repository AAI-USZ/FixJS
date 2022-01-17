function(result) {
              if(result === "startedPZP") {
                pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                  self.connectedApp();
                  log.info("started pzp " + self.sessionId);
                  self.webServerState = global.states[2];
                  if(typeof callback !== "undefined")
                    callback.call(self, "startedPZP", self);
                });
              } else if(result === "startPZPAgain") {
                self.connect(conn_key, null, null, function(result){
                  if (result === "startedPZP") {
                    pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                      self.connectedApp();
                      log.info("started pzp " + self.sessionId);
                      self.webServerState = global.states[2];
                      if(typeof callback !== "undefined")
                        callback.call(self, "startedPZP", self);
                    });
                  }
                });
              }
            }