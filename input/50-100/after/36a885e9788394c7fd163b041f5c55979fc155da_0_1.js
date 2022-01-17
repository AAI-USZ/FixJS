function() {
    
      this.footer     = this.$('footer');
      this.main       = $('#main');
      this.login_btn  = $('#login-btn')
      
      Images.bind('all', this.render, this);
      Images.bind('reset', this.addAll, this);

      // Check if we have an access token      
      var access_token = this._getHashVars('access_token');
      
      if(access_token) {
        // hide the login button
        this.login_btn.hide()
        
        // set the access token
        Backbone.InstagramSync.access_token = access_token;
        
        // fetch the images from instagram
        Images.fetch();
      }
    }