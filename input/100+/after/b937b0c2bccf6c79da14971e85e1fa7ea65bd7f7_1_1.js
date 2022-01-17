function(data, callback){
      this.set("state", "loggedIn");
      this.staleAuthentication = false;

      if (this.get("userPrivate") == undefined) {
        this.set("userPrivate", new User());
      }
      if (this.get("userPublic") == undefined) {
        this.set("userPublic", new UserMask());
      }
      var u = this.get("userPrivate");
      u.id = data.user._id; //set the backbone id to be the same as the mongodb id
      u.set(u.parse(data.user)); //might take internal elements that are supposed to be a backbone model, and override them
      // Over write the public copy with any (new) username/gravatar
      // info
      this.get("userPublic").id = this.get("userPrivate").id ;
      if (data.user.publicSelf == null) {
        // if the user hasnt already specified their public self, then
        // put in a username and gravatar,however they can add more
        // details like their affiliation, name, research interests
        // etc.
        data.user.publicSelf = {};
        data.user.publicSelf.username = this.get("userPrivate").get(
        "username");
        data.user.publicSelf.gravatar = this.get("userPrivate").get(
        "gravatar");
      }
      this.get("userPublic").set(data.user.publicSelf);
//    self.get("userPublic").changeCorpus(data.user.corpuses[0].corpusname);
      // self.get("userPublic").save(); //TODO save this when there is
      // no problem with pouch
//      Utils.debug(data.user);
      if (typeof callback == "function") {
        callback("true"); //tell caller that the user succeeded to authenticate
      }
      Utils.setCookie("username", data.user.username, 365);
      Utils.setCookie("token", data.user.hash, 365);
      this.get("confidential").set("secretkey", data.user.hash);
      this.saveAndEncryptUserToLocalStorage();
    }