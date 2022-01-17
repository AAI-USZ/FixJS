function() {
      this.connectBridge();

      // if fb ad then this loads
      var self = this;
      this.bridge.ready(function(){
        console.log(window.userId);
        if (window.userId) {
          console.log(window.userId);
          self.loginWithId();
        } else {
          if(window.FB){
            if (window.FB.getAccessToken()) {
              self.getAuth(this);
              console.log("AUTHING");
            } else {
              console.log(window.FB);
            }
          // else fb has not loaded yet
          } else {
            window.onFbAuth = function() {
              self.getAuth();
            };
          }
        }
      });
    }