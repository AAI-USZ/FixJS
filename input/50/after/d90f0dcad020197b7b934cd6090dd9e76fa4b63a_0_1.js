function Timing (options) {
  options || (options = {})

  if (options.debug) debug = console.log
  if (options.microtime) Time = require('microtime')

  this.options = options
  this.timers = {}
}