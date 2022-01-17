function(authenticated) {
            setAuthenticationStatus(authenticated);
            if (!authenticated) authenticated = false;
            complete(onComplete, authenticated);
          }