function() {
      this.fbToken = window.FB.getAccessToken();
      var self = this;
      console.log("AUTHING");
      console.log(this.fbToken);
      this.bridge.getService('quizbowl-auth', function(auth) {
        console.log(auth);
        self.login(auth);
      });
    }