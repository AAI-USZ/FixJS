function(){
          //This happens after the user has been authenticated. 
          this.staleAuthentication = false;
          if(typeof callback == "function"){
            callback();
          }
        }