function(validMsgObj) {
    if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'signedCert') {
      self.status = global.states[3]; // Disconnecting

      log('INFO', '[PZP-'+self.sessionId+'] PZP Writing certificates data ');
      self.config.own.cert   = validMsgObj.payload.message.clientCert;
      self.config.master.cert = validMsgObj.payload.message.masterCert;

      global.storeConfig(self.config, function() {
        self.mode  = global.modes[1]; // Moved from Virgin mode to hub mode
        self.sessionId = validMsgObj.from + '/' + self.config.name;
        self.state = global.states[0];
        callback.call(self, 'startPZPAgain');
      });

    } // This is update message about other connected PZP
    else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'pzpUpdate') {
      log('INFO', '[PZP-'+self.sessionId+'] Update PZPs details') ;
      msg = validMsgObj.payload.message;
      for (var i in msg) {
        if (msg.hasOwnProperty(i) && self.sessionId !== msg[i].name) {
          self.connectedPzp[msg[i].name] = {};
          self.connectedPzp[msg[i].name].address = msg[i].address;
          self.connectedPzp[msg[i].name].port    = msg[i].port;
          self.connectedPzp[msg[i].name].state   = global.states[0];
          if(msg[i].newPzp) {
            self.mode  = global.modes[3];
            self.state = global.states[1];
            var client = new pzpClient(); 
            client.connectOtherPZP(self, msg[i]);
          }
        }
      }
    } else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'failedCert') {
      log('ERROR', '[PZP-'+ self.sessionId+'] Failed to get certificate from PZH');
      callback.call(self, "ERROR");

    } else if(validMsgObj.type === 'prop' && validMsgObj.payload.status === 'foundServices') {
      log('INFO', '[PZP-'+self.sessionId+'] Received message about available remote services.');
      this.serviceListener && this.serviceListener(validMsgObj.payload);
    }
    // Forward message to message handler
    else {
      self.messageHandler.onMessageReceived(validMsgObj, validMsgObj.to);
    }
  }