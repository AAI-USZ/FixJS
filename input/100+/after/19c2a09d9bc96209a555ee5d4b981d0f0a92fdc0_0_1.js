function (level, msg, obj) {

    if (window.console) {

      var logMethod;

      if (level !== 'trace') {
        logMethod = console[level];
      }

      if (!logMethod) {
        logMethod = console.log;
      }

      if (obj) {
        logMethod.call(console, "[%s] %s: %o", level.toUpperCase(), msg, obj);
      } else {
        logMethod.call(console, "[%s] %s", level.toUpperCase(), msg);
      }

      //stack tracing for the error log
      if (level === 'error' && console.trace) {
        console.trace();
      }
    }

    //keep chaining
    return this;
  }