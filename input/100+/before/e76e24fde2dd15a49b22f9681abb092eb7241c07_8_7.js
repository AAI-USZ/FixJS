function(data, callback) {
  var self = this;
  var msg, i ;
  session.common.processedMsg(self, data, function(message) { // 1 is for #
    for (var j = 1 ; j < (message.length-1); j += 1 ) {
      if (message[j] === '') {
        continue;
      }

      var parseMsg = JSON.parse(message[j]);
      
      if(parseMsg.type === "prop" && parseMsg.payload.status === "signedCert") {
        self.status = global.states[3]; // Disconnecting
        log("INFO", "[PZP-"+self.sessionId+"] PZP Writing certificates data ");
        self.config.own.cert    = parseMsg.payload.message.clientCert;
        self.config.master.cert = parseMsg.payload.message.masterCert;

        global.storeConfig(self.config, function() {
          self.mode  = global.modes[1]; // Moved from Virgin mode to hub mode
          self.state = global.states[0];
          callback.call(self, "startPZPAgain");
        });

      } // This is update message about other connected PZP
      else if(parseMsg.type === "prop" && parseMsg.payload.status === "pzpUpdate") {
        log("INFO", "[PZP-"+self.sessionId+"] Update PZPs details") ;
        msg = parseMsg.payload.message;
        for ( var i in msg) {
          if (msg.hasOwnProperty(i) && self.sessionId !== msg[i].name) {
            self.connectedPzp[msg[i].name] = {};
            self.connectedPzp[msg[i].name].address = msg[i].address;
            self.connectedPzp[msg[i].name].port   = msg[i].port;
            self.connectedPzp[msg[i].name].state   = global.states[0];
            if(msg[i].newPzp) {
              console.log(msg[i]);
              self.mode  = global.modes[3];
              self.state  = global.states[1];
              var client = new pzpClient(); 
              client.connectOtherPZP(self, msg[i]);
            }
          }
        }
      } else if(parseMsg.type === "prop" && parseMsg.payload.status === "failedCert") {
        log("ERROR", "[PZP-"+ self.sessionId+"] Failed to get certificate from PZH");
        callback.call(self, "ERROR");
      } else if(parseMsg.type === "prop" && parseMsg.payload.status === "foundServices") {
        log("INFO", "[PZP-"+self.sessionId+"] Received message about available remote services.");
        this.serviceListener && this.serviceListener(parseMsg.payload);
      }
      // Forward message to message handler
      else {
        self.messageHandler.onMessageReceived( parseMsg, parseMsg.to);
      }
    }
  });
}