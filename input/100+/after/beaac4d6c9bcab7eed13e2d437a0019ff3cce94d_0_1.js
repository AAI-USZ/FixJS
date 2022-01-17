function Square(options) {
  // argument defaults
  options = options || {};

  // create a new dev/null logger instance
  this.logger = new Logger({
      // turn off timestamps
      timestamp: false

      // don't namespace log messages
    , namespacing: -1

      // emit notifications starting at debug
    , notification: 'log notification level' in options
        ? options['log notification level']
        : Logger.levels.debug

      // only logs with level <= log
    , level: 'log level' in options
        ? options['log level']
        : Logger.levels.log

      // do we want to disable the logging base
    , base: 'disable log transport' in options
        ? !options['disable log transport']
        : true
  });

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
  if (Object.keys(options).length) _.extend(this, options);

  // these values should never be overriden by the _.extend
  this.config = require('../static');
  this.middleware = [];
  this.package = {};
}