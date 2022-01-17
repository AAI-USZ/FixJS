function debug() {
    var args = Array.prototype.slice.call(arguments);
    if (window.localStorage['debug']) console.log.apply(console, args);
  }