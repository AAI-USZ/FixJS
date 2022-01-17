function() {
    var reporter     = this.get('reporter'),
        message      = arguments[0],
        prefix       = this.get('messagePrefix'),
        outputPrefix = this.get('outputMessagePrefix'),
        ret          = NO;

    // If the first argument is a string and a prefix was specified, use it.
    if (message  &&  SC.typeOf(message) === SC.T_STRING) {
      if (prefix  ||  outputPrefix) {
        if (prefix)       message = prefix       + message;
        if (outputPrefix) message = outputPrefix + message;
        arguments[0] = message;
      }
    }

    // Log through the reporter.
    if (this.get('exists')) {
      if (typeof reporter.log === "function") {
        reporter.log.apply(reporter, arguments);
        ret = YES;
      }
      else if (reporter.log) {
        // IE8 implements console.log but reports the type of console.log as
        // "object", so we cannot use apply().  Because of this, the best we
        // can do is call it directly with an array of our arguments.
        reporter.log(this._argumentsToArray(arguments));
        ret = YES;
      }
    }

    // log through alert
    if (!ret  &&  this.get('fallBackOnAlert')) {
      // include support for overriding the alert through the reporter
      // if it has come this far, it's likely this will fail
      if (this.get('exists')  &&  (typeof reporter.alert === "function")) {
        reporter.alert(arguments);
        ret = YES;
      }
      else {
        alert(arguments);
        ret = YES;
      }
    }
    return ret;
  }