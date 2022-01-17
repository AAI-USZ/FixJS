function() {
      this.connectBridge();

      // if fb ad then this loads
      if(window.FB){
        if (window.FB.getAccessToken()) {
          this.getAuth(this);
          console.log("AUTHING");
        } else {
          console.log(window.FB);
        }
      // else fb has not loaded yet
      } else {
        var self = this;
        window.onFbAuth = function() {
          self.getAuth();
        };
      }
    }