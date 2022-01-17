function addEmail(callback) {
    var email = helpers.getAndValidateEmail("#newEmail"),
        self=this;

    if (email) {
      showHint("addressInfo");
      dialogHelpers.addEmail.call(self, email, callback);
    }
    else {
      complete(callback, false);
    }
  }