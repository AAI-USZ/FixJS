function (self, conn) {
  var msg;
  /**
  * Allows PZP to connect if it has proper QRCode
  */
  if(conn.authorized === false) {
    log(self.sessionId, "INFO", "[PZH -"+self.sessionId+"] Connection NOT authorised at PZH");
    /**
    * @descriptpzhion: If this is a new PZP, we allow if it has proper QRCode
    */
    self.expecting.isExpected(function(expected) {
      if (!expected || conn.authorizationError !== "UNABLE_TO_GET_CRL"){
        //we"re not expecting anything - disallow.
        log(self.sessionId, "INFO", "Ending connect: " + conn.authorizationError);
        conn.socket.end();
      } else {
        log(self.sessionId, "INFO","Continuing connect - expected: " + conn.authorizationError);
      }
    });
  }

  /**
  * PZP/PZH connecting with proper certificate at both ends
  */
  if(conn.authorized) {
    var cn, data;
    log(self.sessionId, "INFO", "[PZH -"+self.sessionId+"] Connection authorised at PZH");
    try {
      // Get peer certificate details from the certiicate
      cn = conn.getPeerCertificate().subject.CN;
      var text = decodeURIComponent(cn);
      data = text.split(":");
    } catch(err) {
      log(self.sessionId, "ERROR ","[PZH  -"+self.sessionId+"] Exception in reading common name of peer PZH certificate " + err);
      return;
    }
    /**
    * Connecting PZH details are fetched from the certiciate and then information is stored in internal structures of PZH
    */
    if(data[0] === "Pzh" ) {
      var  pzhId, otherPzh = [], myKey;
      try {
          pzhId = data[1];
      } catch (err1) {
          log(self.sessionId, "ERROR ","[PZH -"+self.sessionId+"] Pzh information in certificate is in unrecognized format " + err1);
          return;
      }

      log(self.sessionId, "INFO", "[PZH -"+self.sessionId+"] PZH "+pzhId+" Connected");
      if(!self.connectedPzh.hasOwnProperty(pzhId)) {
        // Store socket information for communication purpose
        self.connectedPzh[pzhId] = {"socket": conn};
        // This structure is updated for synchronization purpose
        self.connectedPzhIds.push(pzhId);

        // Register PZH with message handler
        msg = self.messageHandler.registerSender(self.sessionId, pzhId);
        self.sendMessage(msg, pzhId);

        // Sends connected PZH details to other connected PZH"s
        msg = self.prepMsg(self.sessionId, pzhId, "pzhUpdate", self.connectedPzhIds);
        self.sendMessage(msg, pzhId);
      }
      /**
       * Authorized PZP session handling
       */
      } else if(data[0] === "Pzp" ) {
        var sessionId, err1;
        try {
          sessionId = self.sessionId+"/"+data[1];
        } catch(err1) {
          log(self.sessionId, "ERROR ","[PZH  -" + self.sessionId + "] Exception in reading common name of PZP certificate " + err1);
          return;
        }

        log(self.sessionId, "INFO", "[PZH -"+self.sessionId+"] PZP "+sessionId+" Connected");
        // Check if PZP is connected or not already, if already connected delete details
        if(self.connectedPzp.hasOwnProperty(sessionId)) {
          delete self.connectedPzp[sessionId];
        }
        // Used for communication purpose. Address is used as PZP might have different IP addresses
        self.connectedPzp[sessionId] = {"socket": conn,  "address": conn.socket.remoteAddress};

        // Register PZP with message handler
        msg = self.messageHandler.registerSender(self.sessionId, sessionId);
        self.sendMessage(msg, sessionId);
      }
      farm.pzhWI.updateList(self);
  }
}