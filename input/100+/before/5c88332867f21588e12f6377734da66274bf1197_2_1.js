function(appidsIn) {      
      this.model.get("userPrivate").set("id","4ff85cecc9de185f0b000004");
      this.model.get("userPrivate").set("username", "sapir");
      this.model.get("userPrivate").set("mostRecentIds", appidsIn);
      var couchConnection = {
          protocol : "https://",
          domain : "ilanguage.iriscouch.com",
          port : "443",
          corpusname : "sapir-firstcorpus"
        };
      var self = this;
      //Set sapir's remote corpus to fetch from
      window.app.get("corpus").logUserIntoTheirCorpusServer(couchConnection,"sapir","phoneme", function(){
        //Replicate sapir's corpus down to pouch
        window.app.get("corpus").replicateCorpus(couchConnection, function(){
          //load the sapir's most recent objects into the existing corpus, datalist, session and user
          window.app.loadBackboneObjectsById(couchConnection , window.appView.authView.model.get("userPrivate").get("mostRecentIds"));
        });
      });
      
      this.model.set({
        username : this.model.get("userPublic").get("username"),
        state : "loggedIn",
        gravatar :  this.model.get("userPublic").get("gravatar") 
      });
      
    }