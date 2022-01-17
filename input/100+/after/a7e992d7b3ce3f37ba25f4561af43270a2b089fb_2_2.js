function(){
        //Replicate sapir's corpus down to pouch
        self.model.get("userPublic").set("id", self.model.get("userPrivate").get("id") );
        var data = {};
        data.user ={};
        if (data.user.publicSelf == null) {
          // if the user hasnt already specified their public self, then
          // put in a username and gravatar,however they can add more
          // details like their affiliation, name, research interests
          // etc.
          data.user.publicSelf = {};
          data.user.publicSelf.username = self.model.get("userPrivate").get(
          "username");
          data.user.publicSelf.gravatar = self.model.get("userPrivate").get(
          "gravatar");
        }
        self.model.get("userPublic").set(data.user.publicSelf);
        self.model.set({
          username : self.model.get("userPrivate").get("username"),
          state : "loggedIn",
          gravatar :  self.model.get("userPrivate").get("gravatar") 
        });
        window.app.get("corpus").replicateCorpus(couchConnection, function(){
          //load the sapir's most recent objects into the existing corpus, datalist, session and user
          window.app.loadBackboneObjectsById(couchConnection , window.appView.authView.model.get("userPrivate").get("mostRecentIds"));
          window.appView.renderEditableUserViews();//TODO sapirs details are in the models, but they arent getting rendered
          window.appView.renderReadonlyUserViews();
          self.render();
        });
      }