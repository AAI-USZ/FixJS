function(status) {
        // registration status checks the status of the last initiated registration,
        // it's possible return values are:
        //   'complete' - registration has been completed
        //   'pending'  - a registration is in progress
        //   'mustAuth' - user must authenticate
        //   'noRegistration' - no registration is in progress
        if (status === "complete" || status === "mustAuth") {
          // As soon as the registration comes back as complete, we should
          // ensure that the stagedOnBehalfOf is cleared so there is no stale
          // data.
          storage.setReturnTo("");

          // Now that the address is verified, its verified bit has to be
          // updated as well or else the user will be forced to verify the
          // address again.
          markAddressVerified(email);

          // To avoid too many address_info requests, returns from each
          // address_info request are cached.  If the user is doing
          // a addressVerificationPoll, it means the user was registering the address
          // and the registration has completed.  Because the status is
          // "complete" or "known", we know that the address is known, so we
          // toggle the field to be up to date.  If the known field remains
          // false, then the user is redirected back to the authentication
          // page and the system thinks the address must be verified again.
          if(addressCache[email]) {
            addressCache[email].known = true;
          }

          // registrationComplete is used in shouldAskIfUsersComputer to
          // prevent the user from seeing the "is this your computer" screen if
          // they just completed a registration.
          registrationComplete = true;

          if (status === "complete") {
            // If the response is complete but the user is not authenticated
            // to the password level, the user *must* authenticate or else
            // they will see an error when they try to certify a cert. Users
            // who have entered their password in this dialog session will be
            // automatically authenticated in modules/check_registration.js,
            // all others will have to enter their password. See issue #2088.
            network.checkAuth(function(authLevel) {
              if (authLevel !== "password") status = "mustAuth";
              complete(onSuccess, status);
            }, onFailure);
          }
          else complete(onSuccess, status);
        }
        else if (status === 'pending') {
          pollTimeout = setTimeout(poll, pollDuration);
        }
        else if (onFailure) {
            onFailure(status);
        }
      }