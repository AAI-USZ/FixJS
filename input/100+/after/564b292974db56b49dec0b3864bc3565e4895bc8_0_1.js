function (/* arguments */) {
    if (suppress) {
      suppress--;
      return;
    }
    if (typeof console !== 'undefined' &&
        typeof console.log !== 'undefined') {
      if (arguments.length == 0) { // IE Companion breaks otherwise
        // IE10 PP4 requires at least one argument
        console.log('');
      } else {
        // IE doesn't have console.log.apply, it's not a real Object.
        // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
        // http://patik.com/blog/complete-cross-browser-console-log/
        if (typeof console.log.apply === "function") {
          // Most browsers
          console.log.apply(console, arguments);
        } else if (typeof Function.prototype.bind === "function") {
          // IE9
          var log = Function.prototype.bind.call(console.log, console);
          log.apply(console, arguments);
        } else {
          // IE8
          Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
        }
      }
    }
  }