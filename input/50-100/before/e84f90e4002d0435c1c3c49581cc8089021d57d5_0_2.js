function checkEmail(email) {
    var identity = user.getStoredEmailKeypair(email);
    if (!identity) {
      alert(gettext("The selected email is invalid or has been deleted."));
      this.publish("assertion_generated", {
        assertion: null
      });
    }

    return !!identity;
  }