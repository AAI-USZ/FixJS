function(data2) {
              for (var j = 1 ; j < (data2.length-1); j += 1 ) {
                if (data2[j] === "") {
                  continue;
                }
                var parse = JSON.parse(data2[j]);

                if(parse.type === "prop" && parse.payload.status === "findServices") {
                  logs(parent.sessionId, "INFO", "[PZP Server-"+ parent.sessionId+"] Trying to send Webinos Services from this RPC handler to " + parse.from + "...");
                  var services = parent.rpcHandler.getAllServices(parse.from);
                  var msg = {"type":"prop", "from":parent.sessionId, "to":parse.from, "payload":{"status":"foundServices", "message":services}};
                  msg.payload.id = parse.payload.message.id;
                  parent.sendMessage(msg, parse.from);
                  logs("INFO", "[PZP Server-"+ parent.sessionId+"] Sent " + (services && services.length) || 0 + " Webinos Services from this RPC handler.");
                }
                else if (parse.type === "prop" && parse.payload.status === "pzpDetails") {
                  if(parent.connectedPzp[parse.from]) {
                    parent.connectedPzp[parse.from].port = parse.payload.message;
                  } else {
                    logs(2, "[PZP Server-"+ parent.sessionId+"] Server: Received PZP"+
                      "details from entity which is not registered : " + parse.from);
                  }
                } else {
                  parent.messageHandler.onMessageReceived( parse, parse.to);
                }
              }
          }