function(options) {
        if (this != navigator.id)
          throw new Error("all navigator.id calls must be made on the navigator.id object");
        options = options || {};
        checkCompat(false);
        return internalRequest(options);
      }