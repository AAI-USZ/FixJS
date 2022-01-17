function(message) {
      for (var i = 1 ; i < (message.length-1); i += 1 ) {
        if (message[i] === '') {
          continue;
        }
        // Parse each individual message
        log(self.sessionId, 'DEBUG', '[PZH -'+self.sessionId+'] Received message' + message[i])
        var parse= JSON.parse(message[i])
        // Message sent by PZP connecting first time based on this message it generates client certificate
        if(parse.type === "prop" && parse.payload.status === "clientCert" ) {
            self.addNewPZPCert(parse, function(err, msg) {
                if (err !== null) {
                    log(self.sessionId,"ERROR", err);
                    return;
                } else {
                    self.sendMessage(msg, parse.from, conn);
                    conn.socket.end();
                }
            });
        }
        else if (parse.type === "prop" && parse.payload.status === "pzpDetails") {
            log(self.sessionId, "INFO", "[PZH -"+ self.sessionId+"] Receiving details from PZP...");
            self.sendPzpUpdate(parse.from, conn, parse.payload.message);
        }
        // information sent by connecting PZP about services it supports. These details are then used by findServices
        else if(parse.type === "prop" && parse.payload.status === "registerServices") {
            log(self.sessionId, "INFO", "[PZH -"+ self.sessionId+"] Receiving Webinos Services from PZP...");
            self.rpcHandler.addRemoteServiceObjects(parse.payload.message);
        }
        // Send findServices information to connected PZP..
        else if(parse.type === "prop" && parse.payload.status === "findServices") {
            log(self.sessionId, "INFO", "[PZH -"+ self.sessionId+"] Trying to send Webinos Services from this RPC handler to " + parse.from + "...");
            var services = self.rpcHandler.getAllServices(parse.from);
            var msg = self.prepMsg(self.sessionId, parse.from, "foundServices", services);
            msg.payload.id = parse.payload.message.id;
            self.sendMessage(msg, parse.from);
            log(self.sessionId, "INFO", "[PZH -"+ self.sessionId+"] Sent " + (services && services.length) || 0 + " Webinos Services from this RPC handler.");
        }
        // Message is forwarded to Messaging manager
        else {
          try {
              self.messageHandler.onMessageReceived(parse, parse.to);
          } catch (err2) {
              log(self.sessionId, "ERROR", "[PZH -"+ self.sessionId+"] Error Message Sending to Messaging " + err2);
          }
        }
      }
   }