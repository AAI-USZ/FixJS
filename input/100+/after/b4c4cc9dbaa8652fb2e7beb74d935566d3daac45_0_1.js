function(data) {
          if (data.errors != null) {
            $(".alert-error").html(
                data.errors.join("<br/>") + " " + Utils.contactUs);
            $(".alert-error").show();
            if (typeof callback == "function") {
              callback(null, data.errors); // tell caller that the user failed to
              // authenticate
            }
          } else if (data.user != null) {
            self.set("state", "loggedIn");
            self.staleAuthentication = false;

            if (self.get("userPrivate") == undefined) {
              self.set("userPrivate", new User());
            }
            if (self.get("userPublic") == undefined) {
              self.set("userPublic", new UserMask());
            }
            var u = self.get("userPrivate");
            u.set("id",data.user._id); //set the backbone id to be the same as the mongodb id
            
            /*
             * Clear out dummy values used to create mongooseauth UserSchema
             */
            if(data.user.dataLists = ["1"]){
              data.user.dataLists = [];
            }
            if(data.user.prefs = {
                "skin" : "",
                "numVisibleDatum" : 1
              }){
              data.user.prefs = {};
            }
            if(data.user.mostRecentIds = {corpusid:null}){
              data.user.mostRecentIds = {};
            };
            if(data.user.teams = ["1"]){
              data.user.teams = [];
            }
            if(data.user.sessionHistory = ["1"]){
              data.user.sessionHistory = [];
            }
            if(data.user.activityHistory = ["1"]){
              data.user.activityHistory = [];
            }
            if(data.user.permissions = {empty:"permission"}){
              data.user.permissions = [];
            }
            if(data.user.hotkeys = {empty: "hotkey"}){
              data.user.hotkeys = [];
            }
              
            u.set(u.parse(data.user)); //might take internal elements that are supposed to be a backbone model, and override them
            // Over write the public copy with any (new) username/gravatar
            // info
            self.get("userPublic").set("id", self.get("userPrivate").get("id") );
            if (data.user.publicSelf == null) {
              // if the user hasnt already specified their public self, then
              // put in a username and gravatar,however they can add more
              // details like their affiliation, name, research interests
              // etc.
              data.user.publicSelf = {};
              data.user.publicSelf.username = self.get("userPrivate").get(
              "username");
              data.user.publicSelf.gravatar = self.get("userPrivate").get(
              "gravatar");
            }
            self.get("userPublic").set(data.user.publicSelf);
            // self.get("userPublic").save(); //TODO save this when there is
            // no problem with pouch
            Utils.debug(data.user);
            if (typeof callback == "function") {
              callback("true"); //tell caller that the user succeeded to authenticate
            }
          }
        }