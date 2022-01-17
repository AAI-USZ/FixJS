function(callback, options) {
        options = options || {};
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
        options.oncancel = function() {
          if (callback) {
            callback(null);
            callback = null;
          }
          observers.login = observers.logout = observers.ready = null;
        };
        if (options && options.silent) {
          if (callback) setTimeout(function() { callback(null); }, 0);
        } else {
          internalRequest(options);
        }
      }