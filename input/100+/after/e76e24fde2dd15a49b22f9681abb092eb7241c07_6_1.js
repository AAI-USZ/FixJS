function(validMsgObj) {
            if(validMsgObj.type === "prop" && validMsgObj.payload.status === "foundServices") {
              logs("INFO", "[PZP Client-"+self.sessionId+"]: Received message about available remote services.");
              parent.serviceListener && parent.serviceListener(validMsgObj.payload);
            } else {
              parent.messageHandler.onMessageReceived(validMsgObj, validMsgObj.to);
            }
          }