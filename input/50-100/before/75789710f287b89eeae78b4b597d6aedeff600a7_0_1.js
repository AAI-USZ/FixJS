function(status) {
        if (status === "complete") {
          // TODO - move the syncEmails somewhere else, perhaps into user.js
          user.syncEmails(function() {
            self.close(self.verificationMessage);
            oncomplete && oncomplete();
          });
        }
        else if (status === "mustAuth") {
          self.close("authenticate", { email: self.email });
          oncomplete && oncomplete();
        }
      }