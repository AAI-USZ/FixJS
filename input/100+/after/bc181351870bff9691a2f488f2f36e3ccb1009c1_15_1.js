function(info) {
            if(info.type === "primary") primaryInfo = info;

            if (info.type === "primary" && info.authed) {
              // this is a primary user who is authenticated with their IdP.
              // We know the user has control of this address, give them
              // a chance to hit "sign in" before we kick them off to the
              // primary flow account.

              // Show the Persona TOS/PP to any primary user who is authed with
              // their IdP but not with Persona.  Unfortunately, addressInfo
              // does not tell us whether a primary address already has an
              // account, so we have to show the personaTOSPP to any user who
              // is not authenticated.
              showTemplate({ signin: true, primary: true, personaTOSPP: !auth_level });
            }
            else if(info.type === "primary" && !info.authed) {
              // User who does not control a primary address.

              // Kick the user down the primary user flow.  User creation and
              // addition will be taken care of there.
              closePrimaryUser.call(self);
            }
            else if(info.type === "secondary" && auth_level === "password") {
              // address is a secondary that the user does not control.

              // user is authenticated to the password level but does not
              // control the address, user is adding a secondary address to
              // their account.  Being authenticated to the password level
              // means the account already has a password, the set_password
              // step is not necessary.  Show the confirmation screen before
              // the verification starts.
              showTemplate({ verify: true });
            }
            else if(info.type === "secondary" && auth_level === "assertion") {
              // address is a secondary that the user does not control.  At
              // this point, we need to know whether the account has a password
              // or not.

              // If the account does not have a password, kick the user down
              // the stage_email flow which will ask to set a password.
              // If the account does have a password, show the user
              // a confirmation screen before starting the verification. When
              // the user confirms ownership of the address, they may be asked
              // for their password and their authentication credentials will
              // be upgraded to "password" status.
              user.passwordNeededToAddSecondaryEmail(function(passwordNeeded) {
                if(passwordNeeded) {
                  self.publish("stage_email", { email: email });
                }
                else {
                  showTemplate({ verify: true });
                }
              });
            }
            else if(info.type === "secondary" && info.known) {
              // address is a known secondary but the user is not logged in.

              // Make the user log in.
              showTemplate({ signin: true, password: true });
            }
            else {
              // address is an unknown secondary.  User is not logged in.

              // Create an account.  User will have to set their password.
              self.close("new_user", { email: email });
            }
            ready();
          }