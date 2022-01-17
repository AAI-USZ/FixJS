function(email, msg) {
      var emailInfo = storage.getEmail(email);
      equal(emailInfo && emailInfo.verified, true,
        "verified bit set for " + email);
    }