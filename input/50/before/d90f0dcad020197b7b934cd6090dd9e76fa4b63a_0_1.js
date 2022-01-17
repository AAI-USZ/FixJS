function Timing (options) {
  options || (options = {})

  if (options.debug) debug = console
  if (options.microtime) Time = require('microtime')

  this.options = options
  this.timers = {}
}