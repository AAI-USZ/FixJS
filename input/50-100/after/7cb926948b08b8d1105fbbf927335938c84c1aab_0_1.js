function() {
        // Add a small delay between the time the XHR is complete and when the
        // submit_disabled class is actually removed.  This helps reduce the
        // amount of flicker the user sees if one XHR request completes and
        // another one starts immediately afterwards.
        // See https://github.com/mozilla/browserid/issues/1898
        setTimeout(function() {
          dom.removeClass("body", "submit_disabled");
          self.publish("submit_enabled");
        }, 100);
      }