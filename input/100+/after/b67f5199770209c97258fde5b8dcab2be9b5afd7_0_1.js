function(callback, options) {
        options = options || {};
        checkCompat(true);
        internalWatch({
          onlogin: function(assertion) {
            if (callback) {
              callback(assertion);
              callback = null
            }
          }
        });
        options.onclose = function() {
          if (callback) {
            callback(null);
            callback = null;
          }
          internalWatch({});
        };
        if (options && options.silent) {
          if (callback) setTimeout(function() { callback(null); }, 0);
        } else {
          internalRequest(options);
        }
      }