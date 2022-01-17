function(callback){
      if(staleAuthentication){
        window.appView.authView.showQuickAuthenticateView( function(){
          //This happens after the user has been authenticated. 
          this.staleAuthentication = false;
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