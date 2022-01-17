function (configure, conn_key, conn_csr) {
        if (configure === "undefined") {
          log.error("pzp configuration is corrupted, please delete ~/.webinos/config/ and restart PZP");
          process.exit();
        }

        self.checkMode(configure);

        if (self.mode === global.modes[0] && config.code === "DEBUG") {
          log.error("configuration code missing, required to enroll device to PZH");
        } 

        self.config = configure;

        if (self.mode === global.modes[0]) { //Virgin
          self.sessionId = configure.name;
        } else {
          self.sessionId = configure.pzhId + '/' + configure.name;
        }

        try {
          self.states = global.states[1];
          if (config.pzhHost && config.pzhHost.split("/")) {
            addr = config.pzhHost.split("/")[0];
          } else {
            addr = config.pzhHost;
          }
          session.common.resolveIP(addr, function(resolvedAddress) {
            log.info("connecting Address: " + resolvedAddress);
            self.address = resolvedAddress;
            self.connect(conn_key, conn_csr, config.code, function(result) {
              if(result === "startedPZP") {
                pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                  self.update(callback);
                });
              } else if(result === "startPZPAgain") {
                self.connect(conn_key, null, null, function(result){
                  if (result === "startedPZP") {
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