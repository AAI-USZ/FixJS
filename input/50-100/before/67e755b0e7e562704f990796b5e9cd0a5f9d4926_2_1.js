function() {
                  self.connectedApp();
                  log.info("started pzp " + self.sessionId);
                  self.webServerState = global.states[2];
                  if(typeof callback !== "undefined")
                    callback.call(self, "startedPZP", self);
                }