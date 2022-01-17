function(stream, callback) {

    callback = callback || function(){}

    if (!this.options._isStreamable) {
      this.options.logger.error('selected output format is not streamable');
      return callback(null, new Error('selected output format is not streamable'));
    }

    var self    = this;
    var options = this.options;

    // parse options to command
    this._prepare(function(err, meta) {
      if (err) {
        return callback(null, err);
      }

      var args = self.buildFfmpegArgs(true, meta);

      if (!args instanceof Array) {
        return callback(null, args);
      }
      // write data to stdout
      args.push('pipe:1');

      // start conversion of file using spawn
      var ffmpegProc = self._spawnProcess(args);

      if (options.inputstream) {
        // pump input stream to stdin
        options.inputstream.resume();
        options.inputstream.pipe(ffmpegProc.stdin);
      }

      //handle timeout if set
      var processTimer;
      if (options.timeout) {
        processTimer = setTimeout(function() {
          ffmpegProc.removeAllListeners('exit');
          ffmpegProc.kill('SIGKILL');
          options.logger.warn('process ran into a timeout (' + options.timeout + 's)');
          callback(self.E_PROCESSTIMEOUT, 'timeout');
        }, options.timeout * 1000);
      }

      var stderr = '';

      ffmpegProc.stderr.on('data', function(data) {
        stderr += data;
        if (options.onCodecData) {
          self._checkStdErrForCodec(stderr);
        }
        if (options.onProgress) {
          self._getProgressFromStdErr(stderr, meta.durationsec);
        }
      });

      ffmpegProc.stdout.on('data', function(chunk) {
        stream.write(chunk);
      });

      ffmpegProc.on('exit', function(code, signal) {
        if (processTimer) {
          clearTimeout(processTimer);
        }
        // close file descriptor on outstream
        if(/^[a-z]+:\/\//.test(options.inputfile)) {
          return callback(code, stderr);
        }

        var cb_ = function() {
          if (!options.inputstream) {
            return callback(code, stderr);
          };
          fs.close(options.inputstream.fd, function() {
            callback(code, stderr);
          });
        };

        if (stream.fd) {
          return fs.close(stream.fd, cb_);
        }
        if (stream.end) {
          stream.end();
        } else {
          callback(code, "stream will not be closed");
        }
        cb_();
      });
    });

  }