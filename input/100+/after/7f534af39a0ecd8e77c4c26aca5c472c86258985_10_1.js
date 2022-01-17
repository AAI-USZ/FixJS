function emailSubmit(oncomplete) {
    var self=this,
        email = helpers.getAndValidateEmail("#email");

    if(email) {
      dom.setAttr('#email', 'disabled', 'disabled');
      user.addressInfo(email, function(info) {
        dom.removeAttr('#email', 'disabled');
        addressInfo = info;

        if(info.type === "secondary") {
          if(info.known) {
            dom.addClass("body", "known_secondary");
            dom.focus("#password");
            self.submit = passwordSubmit;
          }
          else {
            dom.setInner("#unknown_email", email);
            dom.addClass("body", "unknown_secondary");
          }

          complete(oncomplete);
        }
        else if(info.authed) {
          // primary user who is authenticated with the primary, immediately
          // provision and authenticate them to BrowserID.
          provisionPrimaryUser(email, info, oncomplete);
        }
        else {
          dom.addClass("body", "verify_primary");
          dom.setInner("#primary_email", email);
          self.submit = authWithPrimary;

          verifyEmail = email;
          verifyURL = info.auth;

          complete(oncomplete);
        }
      }, pageHelpers.getFailure(errors.addressInfo, oncomplete));
    }
    else {
      complete(oncomplete);
    }
  }