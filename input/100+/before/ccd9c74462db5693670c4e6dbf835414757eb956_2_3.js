function (err) {
      log.error("error connecting server (" + err+")");

      if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
        if (self.mode === global.modes[3] ) { //hub_peer mode
          self.mode = global.modes[2]; // Go in peer mode
                // state will be peer mode state
        } else if (self.mode === global.modes[1] ) { //hub mode
            self.state = global.states[0]; // not connected
            //Zeroconf - start
            switch(os.type().toLowerCase()){
              case "linux":
                switch(os.platform().toLowerCase()){
                  case "android":
                    break;
                  case "linux":
                    var browser = mdns.createBrowser(mdns.tcp('pzp'));   
                    browser.on('error', function(err) {
                    log.error("browser error: (" + err+")");
                    });
                    browser.start();
         
                    var msg ={};
                    browser.on('serviceUp', function(service) {
                    log.info("service up");
                    msg.name = getelement(service, 'name');
                    msg.port = getelement(service, 'port');
                    msg.address = getelement(service, 'addresses');
        
                    log.info("Check ZeroConf discovery list");      
                    var hostname = os.hostname();
                    if(msg.name !== os.hostname()) {
                      //Update connection - msg.name is machine name   
                      msg.name = self.config.pzhId + "/" + msg.name + "_Pzp";
        
                      // Use case - Had connected to this PZP at least once 
                      if((typeof self.connectedPzp[msg.name] !== "undefined") && self.connectedPzp[msg.name].state === global.states[0] ) {
                        self.connectedPzp[msg.name].address = msg.address;
                        self.connectedPzp[msg.name].port = global.pzpServerPort;
                        var client = new pzpClient(); 
                        client.connectOtherPZP(self, msg);
                      }
                      else if (typeof self.connectedPzp[msg.name] === "undefined") {
                        log.info("new peer");   

                        self.connectedPzp[msg.name] = {};
                        self.connectedPzp[msg.name].address = msg.address;
                        self.connectedPzp[msg.name].port    = global.pzpServerPort;
                        self.connectedPzp[msg.name].state   = global.states[1];
                        self.mode  = global.modes[2];
                        self.state = global.states[1];
                        var client = new pzpClient(); 
                        client.connectOtherPZP(self, msg);
                      }
                    }
                  });              
                  break;
                }
                break;
              case "darwin":
                break;
              case "windows_nt":
                break;
            }
        //end - zeroconf
        }       
      } else {
        self.mode = global.modes[1];
        self.state = global.states[0];
        }
      // Special case if started in hub disconnected mode
      if (self.webServerState !== global.states[2]) {
        pzpWebSocket.startPzpWebSocketServer(self, self.inputConfig, function() {
          self.rpcHandler.setSessionId(self.sessionId);
          setupMessageHandler(self);
          self.update(callback);
          
        });
      }
      if(self.pzptlsServerState === global.states[0])
      {
        log.info("Calling start pzptlsServer"); 
        var server = new pzpServer(); 
        server.startServer(self, function() {
        // The reason we send to PZH is because PZH acts as a point of synchronization for connecting PZP"s
        self.prepMsg(self.sessionId, self.config.pzhId, "pzpDetails", global.pzpServerPort);
        self.pzptlsServerState = global.states[2];
        });
      } 
	
      log.info("pzp mode " + self.mode + " and state is " + self.state);
    }