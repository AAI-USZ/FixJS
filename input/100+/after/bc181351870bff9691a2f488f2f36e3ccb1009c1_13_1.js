function(origin_url, paramsFromRP, success, error) {
      var self=this,
          hash = win.location.hash;

      user.setOrigin(origin_url);


      if (startExternalDependencies) {
        var actions = startActions.call(self, success, error);
        startStateMachine.call(self, actions);
      }

      // Security Note: paramsFromRP is the output of a JSON.parse on an
      // RP-controlled string. Most of these fields are expected to be simple
      // printable strings (hostnames, usernames, and URLs), but we cannot
      // rely upon the RP to do that. In particular we must guard against
      // these strings containing <script> tags. We will populate a new
      // object ("params") with suitably type-checked properties.
      var params = {};
      params.hostname = user.getHostname();

      // verify params
      try {
        if (paramsFromRP.requiredEmail) {
          helpers.log("requiredEmail has been deprecated");
        }

        // support old parameter names...
        if (paramsFromRP.tosURL) paramsFromRP.termsOfService = paramsFromRP.tosURL;
        if (paramsFromRP.privacyURL) paramsFromRP.privacyPolicy = paramsFromRP.privacyURL;

        if (paramsFromRP.termsOfService && paramsFromRP.privacyPolicy) {
          params.termsOfService = fixupURL(origin_url, paramsFromRP.termsOfService);
          params.privacyPolicy = fixupURL(origin_url, paramsFromRP.privacyPolicy);
        }

        if (paramsFromRP.siteLogo) {
          // Until we have our head around the dangers of data uris and images
          // that come from other domains, only allow absolute paths from the
          // origin.
          params.siteLogo = fixupAbsolutePath(origin_url, paramsFromRP.siteLogo);
          // To avoid mixed content errors, only allow siteLogos to be served
          // from https RPs
          if (URLParse(origin_url).scheme !== "https") {
            throw "only https sites can specify a siteLogo";
          }
        }

        if (paramsFromRP.siteName) {
          params.siteName = _.escape(paramsFromRP.siteName);
        }

        // returnTo is used for post verification redirection.  Redirect back
        // to the path specified by the RP.
        if (paramsFromRP.returnTo) {
          var returnTo = fixupAbsolutePath(origin_url, paramsFromRP.returnTo);
          user.setReturnTo(returnTo);
        }

        if (hash.indexOf("#AUTH_RETURN") === 0) {
          var primaryParams = JSON.parse(win.sessionStorage.primaryVerificationFlow);
          params.email = primaryParams.email;
          params.add = primaryParams.add;
          params.type = "primary";

          // FIXME: if it's AUTH_RETURN_CANCEL, we should short-circuit
          // the attempt at provisioning. For now, we let provisioning
          // be tried and fail.
        }

        // no matter what, we clear the primary flow state for this window
        win.sessionStorage.primaryVerificationFlow = undefined;
      } catch(e) {
        // note: renderError accepts HTML and cheerfully injects it into a
        // frame with a powerful origin. So convert 'e' first.
        self.renderError("error", {
          action: {
            title: "error in " + _.escape(origin_url),
            message: "improper usage of API: " + _.escape(e)
          }
        });

        return e;
      }
      // after this point, "params" can be relied upon to contain safe data

      // XXX Perhaps put this into the state machine.
      self.bind(win, "unload", onWindowUnload);

      self.publish("start", params);
    }