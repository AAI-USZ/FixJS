function(data2) {
          for (var j = 1 ; j < (data2.length-1); j += 1 ) {
            if (data2[j] === "") {
              continue;
            }
            var parse = JSON.parse(data2[j]);
            if(parse.type === "prop" && parse.payload.status === "foundServices") {
              logs("INFO", "[PZP Client-"+self.sessionId+"]: Received message about available remote services.");
              parent.serviceListener && parent.serviceListener(parse.payload);
            } else {
              parent.messageHandler.onMessageReceived(parse, parse.to);
            }
          }
        }