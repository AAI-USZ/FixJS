function(err, result) {
      var callbackArguments, callbackFunction;
      this.log.debug("performCallback");
      if (this.callback != null) {
        callbackFunction = this.callback;
        callbackArguments = false;
        if (typeof callback === "object") {
          this.log.debug('callback is object');
          callbackFunction = this.callback["function"];
          callbackArguments = this.callback["arguments"];
        }
        if (typeof callbackFunction === "function") {
          return callbackFunction(err, result, callbackArguments);
        }
      } else {
        this.log.error('@__performCallback without @callback');
        return false;
      }
    }