function (conn_key, conn_csr, code, callback) {
  var self, pzpInstance, master;
  self = this;
  var conn_key, config = {};
  try {
    if (self.mode === global.modes[1]) { // Hub Mode
      config = {
        key : conn_key,
        cert: self.config.own.cert,
        crl : self.config.master.crl,
        ca  : self.config.master.cert,
        servername: self.config.serverName
      };
    } else {
      config = {
          key : conn_key,
          cert: self.config.own.cert,
          servername: self.config.serverName
      };
    }

    pzpInstance = tls.connect(global.pzhPort, self.address, config, function(conn) {
      log("INFO","[PZP-"+ self.sessionId+"] Connection to PZH status: " + pzpInstance.authorized );
      log("INFO","[PZP-"+ self.sessionId+"] Reusing session : " + pzpInstance.isSessionReused());

      if(pzpInstance.authorized) {
        var pzhId = decodeURIComponent(pzpInstance.getPeerCertificate().subject.CN);
        self.config.pzhId = pzhId.split(":")[1];
        global.storeConfig(self.config, function() {
          self.authenticated(self.config.pzhId, pzpInstance, callback);
        });
      } else {
        log("INFO","[PZP-"+ self.sessionId+"]: Not Authenticated " );
        if (typeof conn_csr !== "undefined" && conn_csr !== null) {
          var pzhId = decodeURIComponent(pzpInstance.getPeerCertificate().subject.CN);
          pzhId = pzhId.split(":")[1];
          self.unauthenticated(pzpInstance, self.sessionId, pzhId, conn_csr, code);
        }
      }
    });

    /* It fetches data and forward it to processMsg
    * @param data is the received data
    */
    pzpInstance.on("data", function(data) {
      try {
        pzpInstance.pause(); // This pauses socket, cannot receive messages
        self.processMsg(data, callback);
        pzpInstance.resume();// unlocks socket.
      } catch (err) {
        log("ERROR", "[PZP] Exception " + err);

      }
    });

    pzpInstance.on("end", function () {
      var webApp;
      log("INFO", "[PZP-"+ self.sessionId+"] Connection terminated from PZH");
      if (typeof self.sessionId !== "undefined") {
        self.messageHandler.removeRoute(self.config.pzhId, self.sessionId);
        self.rpcHandler.setSessionId(self.sessionId);
        setupMessageHandler(self);
        if (self.config.pzhId) {
            delete self.connectedPzh[self.config.pzhId];
        }
      }
        // TODO: Try reconnecting back to server but when.
    });

    pzpInstance.on("error", function (err) {
      log("ERROR", "[PZP-"+self.sessionId+"] Error connecting server (" + err+")");

      if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
        if (self.mode === global.modes[3] ) { //hub_peer mode
          self.mode = global.modes[2]; // Go in peer mode
                // state will be peer mode state
        } else if (self.mode === global.modes[1] ) { //hub mode
          self.state = global.states[0]; // not connected
        }        
        log("INFO", "[PZP-"+self.sessionId+"] PZP mode " + self.mode + " and state is " + self.state);       
      } else {
        self.mode = global.modes[1];
        self.state = global.states[0];
      }
    });

    pzpInstance.on("close", function () {
      log("INFO", "[PZP-"+ self.sessionId+"] Connection closed");
      if (self.mode === global.modes[3] ) { //hub_peer mode
        self.mode = global.modes[2]; // Go in peer mode
           // state will be peer mode state
      } else if (self.mode === global.modes[1] ) { //hub mode
        self.state = global.states[0]; // not connected
      }
      log("INFO", "[PZP-"+self.sessionId+"] PZP mode " + self.mode + " and state is " + self.state);
    });

  } catch (err) {
    log("ERROR", "[PZP-"+ self.sessionId+"] General Error : " + err);
    throw err;
  }
}