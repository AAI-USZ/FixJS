function(authentication) {
            if (authentication === "assertion") {
              // user must authenticate with their password, kick them over to
              // the required email screen to enter the password.
              startAction("doAuthenticateWithRequiredEmail", {
                email: email,
                secondary_auth: true,

                // This is a user is already authenticated to the assertion
                // level who has chosen a secondary email address from the
                // pick_email screen. They would have been shown the
                // siteTOSPP there.
                siteTOSPP: false
              });
            }
            else {
              redirectToState("email_valid_and_ready", info);
            }
            oncomplete();
          }