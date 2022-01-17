function() {
      Utils.debug("USER render: " + this.el);

      if (this.model != undefined) {
        this.model.set("username", this.model.get("username").toLowerCase().replace(/[^0-9a-z]/g,""));
        // Display the UserWelcomeView
        this.setElement($("#user-welcome-modal"));
        $(this.el).html(this.template(this.model.toJSON()));
        $(".username").focus();
      } else {
        Utils.debug("\User model was undefined");
      }

      return this;
    }