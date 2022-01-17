function Square(options) {
  // create a new dev/null logger instance
  this.logger = new Logger({ timestamp: false, namespacing: 0 });

  // setup our eson parser, which will pre-parse our configuration files
  this.eson = eson()
    .use(eson.include)
    .use(eson.bools)
    .use(eson.glob);

  // When the stdout properly is set we need to see if we should enable logging
  // or not.
  Object.defineProperty(this, 'stdout', {
      get: this.getSTDOUT
    , set: this.setSTDOUT
  });

  // the extend should happen after we have set all the Object.define's so they
  // can get triggered once our options are updated.
  _.extend(this, options || {});

  // these values should never be overriden by the _.extend
  this.config = require('../static');
  this.middleware = [];
  this.package = {};
}