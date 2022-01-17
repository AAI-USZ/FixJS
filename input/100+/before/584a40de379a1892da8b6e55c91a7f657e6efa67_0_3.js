function() {
  var LineBuffer, Stream, async, exec, fs, getUserShell, loginExec, makeTemporaryFilename, parseEnv, path, readAndUnlink, spawn,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  fs = require("fs");

  path = require("path");

  async = require("async");

  exec = require("child_process").exec;

  spawn = require("child_process").spawn;

  Stream = require('stream').Stream;

  exports.LineBuffer = LineBuffer = (function(_super) {

    __extends(LineBuffer, _super);

    function LineBuffer(stream) {
      var self;
      this.stream = stream;
      this.readable = true;
      this._buffer = "";
      self = this;
      this.stream.on('data', function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return self.write.apply(self, args);
      });
      this.stream.on('end', function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return self.end.apply(self, args);
      });
    }

    LineBuffer.prototype.write = function(chunk) {
      var index, line, _results;
      this._buffer += chunk;
      _results = [];
      while ((index = this._buffer.indexOf("\n")) !== -1) {
        line = this._buffer.slice(0, index);
        this._buffer = this._buffer.slice(index + 1, this._buffer.length);
        _results.push(this.emit('data', line));
      }
      return _results;
    };

    LineBuffer.prototype.end = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args.length > 0) {
        this.write.apply(this, args);
      }
      if (this._buffer.length) {
        this.emit('data', this._buffer);
      }
      return this.emit('end');
    };

    return LineBuffer;

  })(Stream);

  exports.bufferLines = function(stream, callback) {
    var buffer;
    buffer = new LineBuffer(stream);
    buffer.on("data", callback);
    return buffer;
  };

  exports.mkdirp = function(dirname, callback) {
    var p;
    return fs.lstat((p = path.normalize(dirname)), function(err, stats) {
      var paths;
      if (err) {
        paths = [p].concat((function() {
          var _results;
          _results = [];
          while (p !== "/" && p !== ".") {
            _results.push(p = path.dirname(p));
          }
          return _results;
        })());
        return async.forEachSeries(paths.reverse(), function(p, next) {
          return path.exists(p, function(exists) {
            if (exists) {
              return next();
            } else {
              return fs.mkdir(p, 0x1ed, function(err) {
                if (err) {
                  return callback(err);
                } else {
                  return next();
                }
              });
            }
          });
        }, callback);
      } else if (stats.isDirectory()) {
        return callback();
      } else {
        return callback("file exists");
      }
    });
  };

  exports.chown = function(path, owner, callback) {
    var chown, error;
    error = "";
    chown = spawn("chown", [owner, path]);
    chown.stderr.on("data", function(data) {
      return error += data.toString("utf8");
    });
    return chown.on("exit", function(code) {
      return callback(error, code === 0);
    });
  };

  exports.pause = function(stream) {
    var onClose, onData, onEnd, queue, removeListeners;
    queue = [];
    onData = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return queue.push(['data'].concat(__slice.call(args)));
    };
    onEnd = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return queue.push(['end'].concat(__slice.call(args)));
    };
    onClose = function() {
      return removeListeners();
    };
    removeListeners = function() {
      stream.removeListener('data', onData);
      stream.removeListener('end', onEnd);
      return stream.removeListener('close', onClose);
    };
    stream.on('data', onData);
    stream.on('end', onEnd);
    stream.on('close', onClose);
    return function() {
      var args, _i, _len, _results;
      removeListeners();
      _results = [];
      for (_i = 0, _len = queue.length; _i < _len; _i++) {
        args = queue[_i];
        _results.push(stream.emit.apply(stream, args));
      }
      return _results;
    };
  };

  exports.sourceScriptEnv = function(script, env, options, callback) {
    var command;
    if (options.call) {
      callback = options;
      options = {};
    } else {
      if (options == null) {
        options = {};
      }
    }
    command = "" + options.before + ";\nsource '" + script + "' > /dev/null;\nenv";
    return exec(command, {
      cwd: path.dirname(script),
      env: env
    }, function(err, stdout, stderr) {
      if (err) {
        err.message = "'" + script + "' failed to load";
        err.stdout = stdout;
        err.stderr = stderr;
        callback(err);
      }
      return callback(null, parseEnv(stdout));
    });
  };

  exports.getUserEnv = function(callback) {
    var filename;
    filename = makeTemporaryFilename();
    return loginExec("env > " + filename, function(err) {
      if (err) {
        return callback(err);
      } else {
        return readAndUnlink(filename, function(err, result) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, parseEnv(result));
          }
        });
      }
    });
  };

  makeTemporaryFilename = function() {
    var filename, random, timestamp, tmpdir, _ref;
    tmpdir = (_ref = process.env.TMPDIR) != null ? _ref : "/tmp";
    timestamp = new Date().getTime();
    random = parseInt(Math.random() * Math.pow(2, 16));
    filename = "pow." + process.pid + "." + timestamp + "." + random;
    return path.join(tmpdir, filename);
  };

  readAndUnlink = function(filename, callback) {
    return fs.readFile(filename, "utf8", function(err, contents) {
      if (err) {
        return callback(err);
      } else {
        return fs.unlink(filename, function(err) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, contents);
          }
        });
      }
    });
  };

  loginExec = function(command, callback) {
    var user;
    user = process.env.LOGNAME;
    return getUserShell(function(shell) {
      return exec("login -qf " + user + " " + shell + " -l -c '" + command + "'", function(err, stdout, stderr) {
        if (err) {
          return exec("login -qf " + user + " " + shell + " -c '" + command + "'", function(err, stdout, stderr) {
            return callback(err, stdout, stderr);
          });
        } else {
          return callback(null, stdout, stderr);
        }
      });
    });
  };

  getUserShell = function(callback) {
    var command;
    command = "dscl . -read '/Users/" + process.env.LOGNAME + "' UserShell";
    return exec(command, function(err, stdout, stderr) {
      var match, matches, shell;
      if (err) {
        return callback(process.env.SHELL);
      } else {
        if (matches = stdout.trim().match(/^UserShell: (.+)$/)) {
          match = matches[0], shell = matches[1];
          return callback(shell);
        } else {
          return callback(process.env.SHELL);
        }
      }
    });
  };

  parseEnv = function(stdout) {
    var env, line, match, matches, name, value, _i, _len, _ref;
    env = {};
    _ref = stdout.split("\n");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      if (matches = line.match(/([^=]+)=(.+)/)) {
        match = matches[0], name = matches[1], value = matches[2];
        env[name] = value;
      }
    }
    return env;
  };

}