function() {
          self.mode  = global.modes[1]; // Moved from Virgin mode to hub mode
          self.state = global.states[0];
          callback.call(self, "startPZPAgain");
        }