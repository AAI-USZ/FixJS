function() {
      self.email = self.stagedEmail;
      redirectToState("email_chosen", { email: self.stagedEmail} );
    }