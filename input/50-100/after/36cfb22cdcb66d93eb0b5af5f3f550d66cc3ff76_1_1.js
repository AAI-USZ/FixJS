function(callback){
      if(this.staleAuthentication){
        var self = this;
        window.appView.authView.showQuickAuthenticateView( function(){
          //This happens after the user has been authenticated. 
          self.staleAuthentication = false;
          if(typeof callback == "function"){
            callback();
          }
        });
      }else{
        //the user has authenticated recently, or there are no changes in their details.
        if(typeof callback == "function"){
          callback();
        }
      }
    }