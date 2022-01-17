function(callback, callbacks) {
    var cb = {}, callbackType = typeof callback;

    if (callbackType === "function") {
      // Custom function with no options
      cb.method = callback;
    } else if (callbackType === "string" && callback in callbacks) {
      // Built in method, use default options
      cb.method = callbacks[callback].method;
    } else if (callbackType === "object") {
      callbackType = typeof callback.method;

      if (callbackType === "function") {
        // Custom function
        cb.method = callback.method;
      } else if (callbackType === "string" && callback.method in callbacks) {
        // Built in method
        cb.method = callbacks[callback.method].method;
        cb.options = $.extend(true, {}, callbacks[callback.method].options, callback.options);
      }
    }

    return cb;
  }