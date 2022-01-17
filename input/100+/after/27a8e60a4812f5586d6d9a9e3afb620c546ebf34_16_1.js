function() {
      var emails = user.getStoredEmailKeypairs();
      if (!emails[email]) {
        displayStoredEmails(oncomplete);
      }
      else if (_.size(emails) > 1) {
        if (confirmAction(format(gettext("Remove %(email) from your Persona account?"),
                                 { email: email }))) {
          user.removeEmail(email, function() {
            displayStoredEmails(oncomplete);
          }, pageHelpers.getFailure(errors.removeEmail, oncomplete));
        }
        else {
          complete();
        }
      }
      else {
        if (confirmAction(gettext("Removing the last address will cancel your Persona account.\nAre you sure you want to continue?"))) {
          user.cancelUser(function() {
            doc.location="/";
            complete();
          }, pageHelpers.getFailure(errors.cancelUser, oncomplete));
        }
        else {
          complete();
        }
      }
    }