function () {
        logs("INFO", "[PZP Server-" + parent.sessionId + "] connection end");
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
      }