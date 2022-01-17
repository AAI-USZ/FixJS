function(passwordNeeded) {
        if(passwordNeeded) {
          self.addEmailEmail = info.email;

          _.extend(info, {
            // cancel is disabled if the user is doing the initial password set
            // for a requiredEmail.
            cancelable: !requiredEmail,

            // stage_email is called to add an email to an already existing
            // account.  Since it is an already existing account, the
            // personaTOSPP does not need to be shown.
            personaTOSPP: false,

            // requiredEmail users who are adding an email but must set their
            // password will be redirected here without seeing any other
            // screens. non-requiredEmail users will have already seen the site
            // TOS/PP in the pick-email screen if it was necessary.  Since
            // requiredEmail users may not have seen the screen before, show it
            // here if there is no originEmail.
            siteTOSPP: self.siteTOSPP && requiredEmail && !user.getOriginEmail()
          });

          startAction(false, "doSetPassword", info);
        }
        else {
          startAction(false, "doStageEmail", info);
        }

        complete(info.complete);
      }