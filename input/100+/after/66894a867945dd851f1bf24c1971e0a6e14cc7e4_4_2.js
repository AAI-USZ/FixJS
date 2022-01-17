function showTemplate(templateData) {
        templateData = _.extend({
          email: email,
          verify: false,
          signin: false,
          password: false,
          secondary_auth: false,
          primary: false,
          personaTOSPP: false,
          cancelable: true
        }, templateData);

        self.renderDialog("required_email", templateData);

        if (options.siteTOSPP) {
          dialogHelpers.showRPTosPP.call(self);
        }

        self.click("#sign_in", signIn);
        self.click("#verify_address", verifyAddress);
        self.click("#forgotPassword", forgotPassword);
        self.click("#cancel", cancel);
      }