function(reason) {
      if (window.name == 'auth_with_primary')
        window.location = 'https://login.persona.org/authenticate_with_primary#complete';
      else
        window.location = 'https://login.persona.org/sign_in#AUTH_RETURN_CANCEL';
    }