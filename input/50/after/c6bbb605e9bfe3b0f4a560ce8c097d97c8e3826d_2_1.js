function() {
      Utils.debug("ACTIVITY VIEW init");
      this.userView = new UserReadView({
        model : this.model.get("user")
      });
      this.userView.format = "link";

      
    }