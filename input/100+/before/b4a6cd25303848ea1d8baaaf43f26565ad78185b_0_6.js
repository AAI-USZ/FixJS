function(args, options) {
    var retProc = spawn(this.ffmpegPath, args, options);
    // only re-nice if running on a non-windows platform
    if (this.options.hasOwnProperty('_nice.level')
        && !os.match(/win(32|64)/)) {
      var niceLevel = this.options._nice.level||0
      if (niceLevel > 0) {
        niceLevel = '+'+niceLevel
      }
      // renice the spawned process without waiting for callback
      var self = this;
      var command = [
        'renice -n', niceLevel,
        '-p', retProc.pid
      ].join(' ');

      exec(command, function(err, stderr, stdout) {
        if (!err) {
          self.options.logger.info('successfully reniced process ' 
          + retProc.pid + ' to ' 
          + niceLevel + ' niceness!');
        }
      });
    }
    if (retProc.stderr) {
      retProc.stderr.setEncoding('utf8');
    }
    return retProc;
  }