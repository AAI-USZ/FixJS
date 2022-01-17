function() {
      if(this.isUserSignedIn()) {
        this.navigate('user/' + this.currentUserId, {trigger: true, replace: true});
      } else {
        this.navigate('login', {trigger: true, replace: true});
      }
    }