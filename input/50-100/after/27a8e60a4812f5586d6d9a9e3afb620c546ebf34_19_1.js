function(info) {
      if (info) {
        redirectTo = info.returnTo;
        email = info.email;
        showRegistrationInfo(info);
        mustAuth = info.must_auth;
        if (mustAuth) {
          // These are users who are authenticating in a different browser or
          // session than the initiator.
          dom.addClass("body", "enter_password");
          dom.focus("input[autofocus]");
          complete(oncomplete, true);
        }
        else {
          // Easy case where user is in same browser and same session, just
          // verify and be done with it all!
          submit(oncomplete);
        }
      }
      else {
        // renderError is used directly instead of pageHelpers.showFailure
        // because showFailure hides the title in the extended info.
        self.renderError("error", errors.cannotConfirm);
        complete(oncomplete, false);
      }
    }