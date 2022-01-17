function(callback, passedOptions) {
        var opts = {};
        opts.privacyPolicy =  passedOptions.privacyPolicy || undefined;
        opts.termsOfService = passedOptions.termsOfService || undefined;
        opts.privacyURL = passedOptions.privacyURL || undefined;
        opts.tosURL = passedOptions.tosURL || undefined;
        checkCompat(true);
        internalWatch({
          onlogin: function(assertion) {
            if (callback) {
              callback(assertion);
              callback = null;
            }
          },
          onlogout: function() {}
        });
        opts.oncancel = function() {
          if (callback) {
            callback(null);
            callback = null;
          }
          observers.login = observers.logout = observers.ready = null;
        };
        if (passedOptions && passedOptions.silent) {
          if (callback) setTimeout(function() { callback(null); }, 0);
        } else {
          internalRequest(opts);
        }
      }