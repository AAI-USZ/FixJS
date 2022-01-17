function(info) {
      if (info) {
        redirectTo = info.returnTo;
        email = info.email;
        showRegistrationInfo(info);

        needsPassword = info.needs_password;
        mustAuth = info.must_auth;

        if (needsPassword) {
          // This is a fix for legacy users who started the user creation
          // process without setting their password in the dialog.  If the user
          // needs a password, they must set it now.  Once all legacy users are
          // verified or their links invalidated, this flow can be removed.
          dom.addClass("body", "enter_password");
          dom.addClass("body", "enter_verify_password");
          complete(oncomplete, true);
        }
        else if (mustAuth) {
          // These are users who have set their passwords inside of the dialog.
          dom.addClass("body", "enter_password");
          complete(oncomplete, true);
        }
        else {
          // These are users who do not have to set their passwords at all.
          submit(oncomplete);
        }
      }
      else {
        showError("#cannotconfirm");
        complete(oncomplete, false);
      }
    }