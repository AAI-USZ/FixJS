function(options) {
        if (this != navigator.id)
          throw new Error("all navigator.id calls must be made on the navigator.id object");
        options = options || {};
        checkCompat(false);
        // returnTo is used for post-email-verification redirect
        if (!options.returnTo) options.returnTo = document.location.pathname;
        return internalRequest(options);
      }