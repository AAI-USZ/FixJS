function(key) {
        var options = {
            key:  key,
            cert: parent.config.own.cert,
            crl:  parent.config.master.crl,
            ca:   parent.config.master.cert
        };

        client = tls.connect(msg.port, msg.address, options, function () {
            if (client.authorized) {
            self.peerSessionId = msg.name;
            logs("INFO", "[PZP Client-" + self.sessionId + "]: Authorized & Connected to PZP: " + msg.address + " name = " + msg.name);


            if (parent.mode === global.modes[3] || parent.mode === global.modes[1] ) {
                parent.mode   = global.modes[3];
            } else {
                parent.mode   = global.modes[2];
            }
            parent.state = global.states[2];

            // Updating at two places as parent.state should tell you at least one is connected in peer mode
            // The process whole connectedPzp to find which is and which is not connected
            parent.connectedPzp[msg.name].state  = global.states[2]
            parent.connectedPzp[msg.name].socket = client;

            var msg1 = parent.messageHandler.registerSender(self.sessionId, msg.name);
            parent.sendMessage(msg1, msg.name);

            } else {
            logs("INFO", "[PZP Client-" + self.sessionId + "]: Connection failed, first connect with PZH ");
            }
        });

        client.on("data", function (data) {
            try {
                client.pause();

                session.common.processedMsg(parent, data, function(data2) {
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
                });

                client.resume();
            } catch (err) {
                logs("ERROR", "[PZP Client-" + self.sessionId + "]: Exception" + err);
            }
        });

        client.on("end", function () {
            logs("INFO", "[PZP Client-" + self.sessionId + "]: Connection terminated");
            parent.connectedPzp[self.peerSessionId].state = global.states[3];

            if (self.mode === global.modes[3]) {
                var status = true;
                for (var key in self.connectedPzp) {
                    if(parent.connectedPzp[key].state === global.states[2]) {
                        status = false;
                        break;
                    }
                }
                if (status) {
                    self.mode = global.modes[1];
                }
            } else {
                self.mode = global.modes[1]; // Go back in hub mode
            }
            parent.connectedPzp[self.peerSessionId].state = global.states[0];
        });

        client.on("error", function (err) {
            logs("ERROR", "[PZP Client-" + self.sessionId + "]:  " + err);
        });

        client.on("close", function () {
            logs("INFO", "[PZP Client-" + self.sessionId + "]:  Connection closed by PZP Server");
        });
    }