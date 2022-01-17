function (err) {
      logs("ERROR", "[PZP Client-" + self.sessionId + "]:  " + err);
      parent.connectedPzp[self.peerSessionId].state = global.states[3];
      if (self.mode === global.modes[2]) {
        self.state = global.states[0];
      }
        
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
    }