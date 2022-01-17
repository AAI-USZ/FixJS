function submit(oncomplete) {
    var pass = dom.getInner("#password") || undefined,
        vpass = dom.getInner("#vpassword") || undefined,
        inputValid = (!needsPassword ||
                    validation.passwordAndValidationPassword(pass, vpass))
             && (!mustAuth ||
                    validation.password(pass));

    if (inputValid) {
      user[verifyFunction](token, pass, function(info) {
        dom.addClass("body", "complete");

        var verified = info.valid,
            selector = verified ? "#congrats" : "#cannotcomplete";

        pageHelpers.replaceFormWithNotice(selector, function() {
          if (redirectTo && verified) {

            // set the loggedIn status for the site.  This allows us to get
            // a silent assertion without relying on the dialog to set the
            // loggedIn status for the domain.  This is useful when the user
            // closes the dialog OR if redirection happens before the dialog
            // has had a chance to finish its business.
            storage.setLoggedIn(URLParse(redirectTo).originOnly(), email);

            setTimeout(function() {
              doc.location.href = redirectTo;
              complete(oncomplete, verified);
            }, redirectTimeout);
          }
          else {
            complete(oncomplete, verified);
          }
        });
      }, function(info) {
        if (info.network && info.network.status === 401) {
          tooltip.showTooltip("#cannot_authenticate");
          complete(oncomplete, false);
        }
        else {
          pageHelpers.showFailure(errors.verifyEmail, info, oncomplete);
        }
      });
    }
    else {
      complete(oncomplete, false);
    }
  }