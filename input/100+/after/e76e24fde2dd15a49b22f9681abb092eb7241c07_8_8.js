function(resolvedAddress) {
            log("INFO", "[PZP-"+ self.sessionId+"] Connecting Address: " + resolvedAddress);
            self.address = resolvedAddress;
            self.connect(conn_key, conn_csr, config.code, function(result) {
              if(result === "startedPZP") {
                pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                  self.connectedApp();
                  log("INFO", "[PZP-"+ self.sessionId+"] Started PZP");
                  self.webServerState = global.states[2];
                });
              } else if(result === "startPZPAgain") {
                self.connect(conn_key, null, null, function(result){
                  if (result === "startedPZP") {
                    pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                      self.connectedApp();
                      log("INFO", "[PZP-"+ self.sessionId+"] Started PZP");
                      self.webServerState = global.states[2];
                    });
                  }
                });
              }
            });
          }