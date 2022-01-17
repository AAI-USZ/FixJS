function(authentication) {
          if (authentication === "assertion") {
             // user must authenticate with their password, kick them over to
            // the required email screen to enter the password.
            redirectToState("authenticate_specified_email", info);
          }
          else {
            redirectToState("email_valid_and_ready", info);
            oncomplete();
          }
        }