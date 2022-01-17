function(options) {
      var self=this;
      self.checkRequired(options, "token", "verifyFunction");

      token = options.token;
      verifyFunction = options.verifyFunction;
      doc = options.document || document;

      redirectTimeout = options.redirectTimeout;
      if (typeof redirectTimeout === "undefined") {
        redirectTimeout = REDIRECT_SECONDS * 1000;
      }

      startVerification.call(self, options.ready);

      sc.start.call(self, options);
    }