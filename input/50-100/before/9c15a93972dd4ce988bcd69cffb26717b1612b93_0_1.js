function(result){
                if (result === "startedPZP" && self.webServerState !== global.states[2]) {
                  console.log(self.webServerState);
                  pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                    self.update(callback);
                  });
                }
              }