function(options) {
      var origin = user.getOrigin(),
          self=this;

      options = options || {};

      dom.addClass("body", "pickemail");

      self.renderDialog("pick_email", {
        identities: getSortedIdentities(),
        siteemail: storage.site.get(origin, "email"),
        privacy_url: options.privacyURL,
        tos_url: options.tosURL
      });
      dom.getElements("body").css("opacity", "1");
      if (dom.getElements("#selectEmail input[type=radio]:visible").length === 0) {
        // If there is only one email address, the radio button is never shown,
        // instead focus the sign in button so that the user can click enter.
        // issue #412
        dom.focus("#signInButton");
      }

      self.click("#useNewEmail", addEmail);
      // The click function does not pass the event to the function.  The event
      // is needed for the label handler so that the correct radio button is
      // selected.
      self.bind("#selectEmail label", "click", proxyEventToInput);
      self.click("#thisIsNotMe", notMe);

      sc.start.call(self, options);

      pickEmailState.call(self);
    }