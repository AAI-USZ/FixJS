function(authenticated) {
        setAuthenticationStatus(authenticated);

        if(authenticated) {
          User.syncEmails(function() {
            onComplete && onComplete(authenticated);
          }, onFailure);
        } else if (onComplete) {
          onComplete(authenticated);
        }
      }