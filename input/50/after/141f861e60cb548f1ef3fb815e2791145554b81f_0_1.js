function() {
    if ("console" in window) {
      return function(msg) {
        window.console.log('Processing.js: ' + msg);
      };
    }
    return nop;
  }