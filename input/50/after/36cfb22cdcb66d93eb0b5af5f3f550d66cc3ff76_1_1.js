function(){
          //This happens after the user has been authenticated. 
          self.staleAuthentication = false;
          if(typeof callback == "function"){
            callback();
          }
        }