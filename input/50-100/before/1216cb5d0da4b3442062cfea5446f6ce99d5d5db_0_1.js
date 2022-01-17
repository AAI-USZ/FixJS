function fixture(options) {
  "use strict";

  var square = this;
  square.emit('plugin.fixture:init', options, this);

  return function middleware(output, next) {
    square.emit('plugin.fixture:call', output, this);

    next();
  };
}