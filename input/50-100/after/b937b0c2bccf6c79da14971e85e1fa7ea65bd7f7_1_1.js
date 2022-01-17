function() {
      this.bind('error', function(model, error) {
        Utils.debug("Error in Authentication  : " + error);
      });
      if(!this.get("confidential")){
        this.set("confidential", new Confidential());
        if(Utils.getCookie("token")){
          this.get("confidential").set("secretkey", Utils.getCookie("token")); //TODO store the token somewhere safer
        }
      }
    }