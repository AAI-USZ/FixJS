function() {
      this.connectBridge();

      // if fb ad then this loads
      if(window.FB){
        this.getAuth(this);
        console.log("AUTHING");
      // else fb has not loaded yet
      } else {
        var self = this;
        window.onFbAuth = function() {
          self.getAuth();
        };
      }
    }