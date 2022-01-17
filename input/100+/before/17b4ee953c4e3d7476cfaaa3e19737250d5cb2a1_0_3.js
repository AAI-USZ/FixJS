function(callback, result) {
      var callbackArguments, callbackFunction;
      this.log.debug("performCallback");
      if (callback != null) {
        callbackFunction = callback;
        callbackArguments = false;
        if (typeof callback === "object") {
          callbackFunction = callback["function"];
          callbackArguments = callback["arguments"];
        }
        if (typeof callbackFunction === "function") {
          return callbackFunction(result, callbackArguments);
        }
      }
    }