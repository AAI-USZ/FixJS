function(email, password, onComplete, onFailure) {
      // password is out of length range.  Don't even send the request
      // and waste backend cycles. See issue #2032.
      if (password.length < bid.PASSWORD_MIN_LENGTH
       || password.length > bid.PASSWORD_MAX_LENGTH) {
        complete(onComplete, false);
        return;
      }

      network.authenticate(email, password, function(authenticated) {
        setAuthenticationStatus(authenticated);

        if(authenticated) {
          User.syncEmails(function() {
            onComplete && onComplete(authenticated);
          }, onFailure);
        } else if (onComplete) {
          onComplete(authenticated);
        }
      }, onFailure);
    }