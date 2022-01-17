function(resolvedAddress) {
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
        }