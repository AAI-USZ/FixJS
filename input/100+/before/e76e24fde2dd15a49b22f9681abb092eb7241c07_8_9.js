function(config, modules) {
  var self = this;
  
  self.rpcHandler     = new RPCHandler(this); // Handler for remote method calls.
  self.messageHandler = new MessageHandler(this.rpcHandler); // handler for all things message
  self.modules         = modules;
  self.rpcHandler.loadModules(modules);// load specified modules
  
  if (config && config.pzhHost !== "undefined" && config.pzpName!== "undefined" && config.pzpHost !== "undefined") {
    global.createDirectoryStructure( function() {
      global.setConfiguration(config.pzpName, "Pzp", config.pzhHost, function (configure, conn_key, conn_csr) {
        if (configure === "undefined") {
          log("ERROR", "Error in loading PZP configuration, please delete ~/.webinos/config/ and restart PZP");
          process.exit();
        }

        self.checkMode(configure);

        if (self.mode === global.modes[0] && config.code === "DEBUG") {
          log("ERROR", "Configuration Code Missing, required to enroll device to PZH");
          process.exit();
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
            log("INFO", "[PZP -"+ self.sessionId+"] Connecting Address: " + resolvedAddress);
            self.address = resolvedAddress;
            self.connect(conn_key, conn_csr, config.code, function(result) {
              if(result === "startedPZP") {
                pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                  self.connectedApp();
                  log("INFO", "[PZP -"+ self.sessionId+"] Started PZP");
                });
              } else if(result === "startPZPAgain") {
                self.connect(conn_key, null, null, function(result){
                  if (result === "startedPZP") {
                    pzpWebSocket.startPzpWebSocketServer(self, config, function() {
                      self.connectedApp();
                      log("INFO", "[PZP -"+ self.sessionId+"] Started PZP");
                    });
                  }
                });
              }
            });
          });
        } catch (err) {
          log("ERROR", "Failed Starting PZP in Hub Mode");
          self.state = global.states[0];
          callback.call(self, "failedStarting", self);
          return;
        }
      });
    });
  } else {
    log("ERROR", "[PZP-"+ self.sessionId+"] Failed starting PZP, configuration parameters missing " );
    process.exit();
  }
}