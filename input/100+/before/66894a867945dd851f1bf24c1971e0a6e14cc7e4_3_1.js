function (authenticated) {
              if (authenticated) {
                user.syncEmails(function() {
                  self.close(self.verificationMessage);
                  oncomplete && oncomplete();
                });
              } else {
                user.addressInfo(self.email, function(info) {
                  self.close("authenticate", info);
                });
              }
            }