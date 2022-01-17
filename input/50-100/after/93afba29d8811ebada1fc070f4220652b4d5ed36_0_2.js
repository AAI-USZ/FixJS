function() {
      if(!this.isUserSignedIn())
      {
        var view = new LoginView();
        this.setView(view, "Login");
      } else {
        this.home();
      }
    }