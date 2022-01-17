function() {
    var identities = lib.getStoredEmailKeypairs();
    equal("object", typeof identities, "object returned");
  }