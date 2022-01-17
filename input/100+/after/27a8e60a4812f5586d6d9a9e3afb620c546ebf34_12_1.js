function(status) {
        if (status === "complete") {
          // TODO - move the syncEmails somewhere else, perhaps into user.js
          user.syncEmails(function() {
            self.close(self.verificationMessage, { mustAuth: false });
            oncomplete && oncomplete();
          });
        }
        else if (status === "mustAuth") {
          // if we have a password (because it was just chosen in dialog),
          // then we can authenticate the user and proceed
          if (self.password) {
            // XXX Move all of this authentication stuff into user.js.  This
            // high level shouldn't have to worry about this stuff.
            user.authenticate(self.email, self.password, function (authenticated) {
              if (authenticated) {
                user.syncEmails(function() {
                  self.close(self.verificationMessage, { mustAuth: false });
                  oncomplete && oncomplete();
                });
              } else {
                // unable to log the user in, make them authenticate manually.
                self.close(self.verificationMessage, { mustAuth: true });
              }
            });
          } else {
            // no password to log the user in, make them authenticate manually.
            self.close(self.verificationMessage, { mustAuth: true });
          }

          oncomplete && oncomplete();
        }
      }