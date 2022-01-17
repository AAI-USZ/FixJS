function (conn) {
      var cn, clientSessionId;
      /* If connection is authorized:
      * SessionId is generated for PZP. Currently it is PZH"s name and
      * PZP"s CommonName and is stored in form of PZH/PZP.
      * registerClient of message manager is called to store PZP as client of PZH
      * Connected_client list is sent to connected PZP. Message sent is with payload
      * of form {status:"Auth", message:parent.connected_client} and type as prop.
      */
      if (conn.authorized) {
        var text = decodeURIComponent(conn.getPeerCertificate().subject.CN);
        var cn = text.split(":")[1];

        clientSessionId = parent.config.pzhId + "/"+ cn; //parent.pzhId + "/" +cn;
        log.info("client authenticated " + clientSessionId) ;

        if (parent.mode === global.modes[1]) {
          parent.mode = global.modes[3];
        } else {
          parent.mode = global.modes[2];
        }

        parent.state = global.states[2];
	
	if(typeof parent.connectedPzp[clientSessionId] !== "undefined")
	{
          parent.connectedPzp[clientSessionId].socket = conn;
          parent.connectedPzp[clientSessionId].state  = global.states[2];
	}

        var msg = parent.messageHandler.registerSender(parent.sessionId, clientSessionId);
        parent.sendMessage(msg, clientSessionId);

      } 

      conn.on("data", function (buffer) {
        try{
          session.common.readJson(self, buffer, function(obj) {
            session.common.processedMsg(self, obj, function(validMsgObj) {
              if(validMsgObj.type === "prop" && validMsgObj.payload.status === "findServices") {
                log.info("trying to send Webinos Services from this RPC handler to " + validMsgObj.from + "...");
                var services = parent.rpcHandler.getAllServices(validMsgObj.from);
                var msg = {"type":"prop", "from":parent.sessionId, "to":validMsgObj.from, "payload":{"status":"foundServices", "message":services}};
                msg.payload.id = validMsgObj.payload.message.id;
                parent.sendMessage(msg, validMsgObj.from);
                log.info("sent " + (services && services.length) || 0 + " Webinos Services from this RPC handler.");
              }
              else if (validMsgObj.type === "prop" && validMsgObj.payload.status === "pzpDetails") {
                if(parent.connectedPzp[validMsgObj.from]) {
                  parent.connectedPzp[validMsgObj.from].port = validMsgObj.payload.message;
                } else {
                  log.info("received pzp details from entity which is not registered : " + validMsgObj.from);
                }
              } else {
                parent.messageHandler.onMessageReceived( validMsgObj, validMsgObj.to);
              }
            });
          });
        } catch(err) {
          log.error(err);
        }
      });

      conn.on("end", function () {
        log.info("connection end");
        var status = true;
        for (var key in self.connectedPzp) {
          if (parent.connectedPzp[key].state === global.states[2]) {
            status = false;
            break;
          }
        }

        if(status) {// No pzp is connected directly
          if (parent.mode === global.modes[3]) {
            parent.mode = global.modes[1];
          } else if (parent.mode === global.modes[2]) {
            parent.state = global.states[0];
          }
        } 
        
        for (var key in parent.connectedPzp) {
          if (parent.connectedPzp[key].socket === conn){
            parent.connectedPzp[key].state = global.states[0];
          }
        }
        log.info('mode '+ parent.mode + ' state '+parent.state);
      });

      // It calls removeClient to remove PZP from connected_client and connectedPzp.
      conn.on("close", function() {
        log.info("socket closed");
      });

      conn.on("error", function(err) {
        parent.connectedPzp[self.peerSessionId].state = global.states[3];
        var status = true;

        for (var key in self.connectedPzp) {
          if (parent.connectedPzp[key].state === global.states[2]) {
            status = false;
            break;
          }
        }

        if(status) {// No pzp is connected directly
          if (parent.mode === global.modes[3]) {
            parent.mode = global.modes[1];
          } else if (parent.mode === global.modes[2]) {
            parent.state = global.states[0];
          }
        } 

        for (var key in parent.connectedPzp) {
          if (parent.connectedPzp[key].socket === conn){
            parent.connectedPzp[key].state = global.states[0];
          }
        }
        log.info('mode '+ parent.mode + ' state '+parent.state);
      });
    }