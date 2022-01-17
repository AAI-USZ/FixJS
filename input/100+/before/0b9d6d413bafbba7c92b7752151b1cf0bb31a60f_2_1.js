function() {
      var emails = user.getStoredEmailKeypairs();
      if (!emails[email]) {
        displayStoredEmails(oncomplete);
      }
      else if (_.size(emails) > 1) {
        if (confirmAction("Remove " + email + " from your BrowserID?")) {
          user.removeEmail(email, function() {
            displayStoredEmails(oncomplete);
          }, pageHelpers.getFailure(errors.removeEmail, oncomplete));
        }
        else {
          complete();
        }
      }
      else {
        if (confirmAction("Removing the last address will cancel your BrowserID account.\nAre you sure you want to continue?")) {
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