function() {
            self.close(self.verificationMessage, { mustAuth: false });
            oncomplete && oncomplete();
          }