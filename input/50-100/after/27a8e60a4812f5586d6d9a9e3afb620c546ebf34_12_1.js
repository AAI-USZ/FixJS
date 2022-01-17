function (authenticated) {
              if (authenticated) {
                user.syncEmails(function() {
                  self.close(self.verificationMessage, { mustAuth: false });
                  oncomplete && oncomplete();
                });
              } else {
                // unable to log the user in, make them authenticate manually.
                self.close(self.verificationMessage, { mustAuth: true });
              }
            }