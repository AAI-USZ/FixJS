function showTemplate(templateData) {
        templateData = helpers.extend({
          email: email,
          verify: false,
          signin: false,
          password: false,
          secondary_auth: false,
          primary: false,
          privacy_url: options.privacyURL || null,
          tos_url: options.tosURL || null
        }, templateData);

        self.renderDialog("required_email", templateData);

        self.click("#sign_in", signIn);
        self.click("#verify_address", verifyAddress);
        self.click("#forgotPassword", forgotPassword);
        self.click("#cancel", cancel);
      }