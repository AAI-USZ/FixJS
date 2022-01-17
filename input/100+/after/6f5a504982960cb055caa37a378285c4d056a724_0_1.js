function(options) {
      var self=this,
          enableDelayMS = options.enableDelayMS || 100;

      function cancelRemoveClassDelay() {
        if (self.enableDelay) {
          clearTimeout(self.enableDelay);
          self.enableDelay = null;
        }
      }

      self.subscribe("xhr_start", function() {
        // A new XHR request has started since the enableDelay was
        // started. Since the timeout has not yet completed, cancel it so the
        // button does not flicker.
        cancelRemoveClassDelay();
        dom.addClass("body", "submit_disabled");
      });

      self.subscribe("xhr_complete", function() {
        // Add a small delay between the time the XHR is complete and when the
        // submit_disabled class is actually removed.  This helps reduce the
        // amount of flicker the user sees if one XHR request completes and
        // another one starts immediately afterwards.
        // See https://github.com/mozilla/browserid/issues/1898

        // If multiple xhr_completes come in, the class should be removed after
        // the timeout of the LAST completion. Cancel any that are outstanding.
        cancelRemoveClassDelay();
        self.enableDelay = setTimeout(function() {
          dom.removeClass("body", "submit_disabled");
          self.enableDelay = null;
          self.publish("submit_enabled");
        }, enableDelayMS);
      });

      sc.start.call(self, options);
    }