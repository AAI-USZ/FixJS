function (err) {
      log("ERROR", "[PZP-"+self.sessionId+"] Error connecting server (" + err+")");

      if (err.code === "ECONNREFUSED" || err.code === "ECONNRESET") {
        if (self.mode === global.modes[3] ) { //hub_peer mode
          self.mode = global.modes[2]; // Go in peer mode
                // state will be peer mode state
        } else if (self.mode === global.modes[1] ) { //hub mode
          self.state = global.states[0]; // not connected
        }        
        log("INFO", "[PZP-"+self.sessionId+"] PZP mode " + self.mode + " and state is " + self.state);       
      } else {
        self.mode = global.modes[1];
        self.state = global.states[0];
      }
    }