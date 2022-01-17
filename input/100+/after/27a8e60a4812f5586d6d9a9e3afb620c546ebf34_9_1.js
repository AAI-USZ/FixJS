function markAddressVerified(email) {
    var idInfo = storage.getEmail(email) || {};
    idInfo.verified = true;
    storage.addSecondaryEmail(email, idInfo);
  }