function debug() {
    var args = Array.prototype.slice.call(arguments);
    if (window.localStorage['debug_js'] == 'true') console.log.apply(console, args);
  }