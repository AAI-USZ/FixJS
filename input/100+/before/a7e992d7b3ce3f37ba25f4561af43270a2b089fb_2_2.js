function(username, password, callback) {
      // Current signed in as the public user - special case authentication
      if (username == "public") {
        this.authenticateAsPublic();
        return;
      }
      
      // Currently signed in as Sapir - no authentication needed
      if (username == "sapir") {
//        window.appView.loadSample();
//        if(typeof callback == "function"){
//          callback();
//        }
//        return;
      }
      
      // Temporarily keep the given's credentials
      var tempuser = new User({
        username : username,
        password : password
      });

      var self = this;
      this.model.authenticate(tempuser, function(success) {
        if (success == null) {
          alert("Authentication failed. Authenticating as public.");
//          self.authenticateAsPublic();
          return;
        }
        
        var couchConnection = self.model.get("userPrivate").get("corpuses")[0]; //TODO make this be the last corpus they edited so that we re-load their dashboard, or let them chooe which corpus they want.
        window.app.get("corpus").logUserIntoTheirCorpusServer(couchConnection, username, password, function(){
          //Replicate user's corpus down to pouch
          window.app.get("corpus").replicateCorpus(couchConnection, function(){
            if(self.model.get("userPrivate").get("mostRecentIds") == undefined){
              //do nothing because they have no recent ids
              Utils.debug("User does not have most recent ids, doing nothing.");
            }else{
              /*
               *  Load their last corpus, session, datalist etc
               */
              var appids = self.model.get("userPrivate").get("mostRecentIds");
              window.app.loadBackboneObjectsById(couchConnection, appids);
            }                    
          });
        });


        
        // Save the authenticated user in our Models
        self.model.set({
          gravatar : self.model.get("userPrivate").get("gravatar"),
          username : self.model.get("userPrivate").get("username"),
          state : "loggedIn"
        });
        if(typeof callback == "function"){
          callback();
        }
      });
    }