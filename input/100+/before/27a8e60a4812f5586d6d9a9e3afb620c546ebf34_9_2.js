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

          if (onSuccess) {
            onSuccess(status);
          }
        }
        else if (status === 'pending') {
          pollTimeout = setTimeout(poll, 3000);
        }
        else if (onFailure) {
            onFailure(status);
        }
      }