function(userId) {
      this.currentUserId = userId;
      router = this;

      Backbone.history.start();

      var hash = window.location.hash;
      if(hash === '' || hash === '#') {
        if(!userId) {
          this.navigate('login', {trigger: true, replace: true});
        } else {
          this.navigate('user/' + userId, {trigger: true, replace: true});
        }
      }
    }