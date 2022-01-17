function(authentication) {
            if (authentication === "assertion") {
              // user must authenticate with their password, kick them over to
              // the required email screen to enter the password.
              startAction("doAuthenticateWithRequiredEmail", {
                email: email,
                secondary_auth: true,
                privacyURL: self.privacyURL,
                tosURL: self.tosURL
              });
            }
            else {
              redirectToState("email_valid_and_ready", info);
            }
            oncomplete();
          }