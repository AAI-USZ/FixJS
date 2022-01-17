function () {
      log.info("connection terminated");
      if(typeof parent.connectedPzp[self.peerSessionId] !== "undefined")
        parent.connectedPzp[self.peerSessionId].state = global.states[3];
      if (parent.mode === global.modes[2]) {
        parent.state = global.states[0];
      }
        
      if (parent.mode === global.modes[3]) {
        var status = true;
        for (var key in self.connectedPzp) {
          if(parent.connectedPzp[key].state === global.states[2]) {
            status = false;
            break;
          }
        }
        if (status) {
          parent.mode = global.modes[1];
        }
      } else {
        parent.mode = global.modes[1]; // Go back in hub mode
      }
      if(typeof parent.connectedPzp[self.peerSessionId] !== "undefined")	
        parent.connectedPzp[self.peerSessionId].state = global.states[0];
      log.info('mode '+ parent.mode + ' state '+parent.state);

    }