function(authenticated) {
            setAuthenticationStatus(authenticated);
            complete(onComplete, authenticated);
          }