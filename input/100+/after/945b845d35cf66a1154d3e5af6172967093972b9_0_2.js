function(f) {
        if (handler && typeof handler === 'function') {
            try { signal.disconnect(handler); }
            catch (e) {}
        }

        if (typeof f === 'function') {
            handler = function() {
              var error;
              if (page === phantom.page) {
                  error = window.__exception;
              } else {
                  error = page.evaluate(function() {
                      var orig = window.__exception;

                      if (typeof orig === 'object') {
                          return {
                              line:      orig.line,
                              message:   orig.message,
                              name:      orig.name,
                              sourceId:  orig.sourceId,
                              sourceURL: orig.sourceURL,
                              stack:     orig.stack
                          };
                      } else {
                          return orig;
                      }
                  });

                  if (typeof error === 'object') {
                      error.toString = function() { return this.name + ": " + this.message; };
                  }
              }

              // The error.stack is passed for backwards compat, but it considered deprecated.
              f(error, error.stack);
            };
            signal.connect(handler);
        } else {
            handler = null;
        }
    }