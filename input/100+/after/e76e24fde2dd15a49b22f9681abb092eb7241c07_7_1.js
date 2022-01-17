function(obj) {
            session.common.processedMsg(self, obj, function(validMsgObj) {
              if(validMsgObj.type === "prop" && validMsgObj.payload.status === "findServices") {
                logs(parent.sessionId, "INFO", "[PZP Server-"+ parent.sessionId+"] Trying to send Webinos Services from this RPC handler to " + validMsgObj.from + "...");
                var services = parent.rpcHandler.getAllServices(validMsgObj.from);
                var msg = {"type":"prop", "from":parent.sessionId, "to":validMsgObj.from, "payload":{"status":"foundServices", "message":services}};
                msg.payload.id = validMsgObj.payload.message.id;
                parent.sendMessage(msg, validMsgObj.from);
                logs("INFO", "[PZP Server-"+ parent.sessionId+"] Sent " + (services && services.length) || 0 + " Webinos Services from this RPC handler.");
              }
              else if (validMsgObj.type === "prop" && validMsgObj.payload.status === "pzpDetails") {
                if(parent.connectedPzp[validMsgObj.from]) {
                  parent.connectedPzp[validMsgObj.from].port = validMsgObj.payload.message;
                } else {
                  logs(2, "[PZP Server-"+ parent.sessionId+"] Server: Received PZP"+
                    "details from entity which is not registered : " + validMsgObj.from);
                }
              } else {
                parent.messageHandler.onMessageReceived( validMsgObj, validMsgObj.to);
              }
            });
          }