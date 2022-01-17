function addProcess() {
    var EventEmitter = require('events').EventEmitter;
    process = new EventEmitter;
    process.env = {};
    process.nextTick = function(fn) { fn() };
    process.exit = function(status) {
      process.emit('exit');
      phantom.exit(status);
    };
    process.stdout = {
      write: function(string) { fs.write("/dev/stdout", string, "w"); }
    };
    process.stderr = {
      write: function(string) { fs.write("/dev/stderr", string, "w"); }
    };
    process.argv = ['nodify', phantom.scriptName].concat(phantom.args);
    
    var phantomSetTimeout = nodify.__orig__setTimeout = setTimeout;
    setTimeout = function(fn, delay) {
      return phantomSetTimeout(function() {
        try {
          fn();
        } catch (e) {
          process.emit('uncaughtException', e);
        }
      }, delay);
    };
  }