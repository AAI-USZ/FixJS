function() {
      this.fbToken = window.FB.getAccessToken();
      var self = this;
      console.log(this.fbToken);
      this.bridge.getService('quizbowl-auth', function(auth) {
        self.login(auth);
      });
    }