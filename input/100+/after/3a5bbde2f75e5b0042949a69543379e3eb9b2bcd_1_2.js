function() {
      var self = this;
      this.bridge.getService('quizbowl-'+namespace+'-auth', function(auth) {
        auth.loginWithId(window.userId, function(user) {
          console.log(user);
          self.getMultiService(user);
          if (user) {
            setInterval(function(){
              auth.alive(user.id);
            }, 5000);
          }
        });
      });
    }