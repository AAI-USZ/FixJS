function() {
  var EventEmitter, Process, WebProcess, getOpenPort, net, spawn, tryConnect,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  net = require('net');

  EventEmitter = require('events').EventEmitter;

  spawn = require('child_process').spawn;

  Process = (function(_super) {

    __extends(Process, _super);

    Process.name = 'Process';

    function Process(name, command, options) {
      this.name = name;
      this.command = command;
      if (options == null) {
        options = {};
      }
      this.cwd = options.cwd;
    }

    Process.prototype.spawn = function() {
      var env, key, value, _ref;
      env = {};
      _ref = process.env;
      for (key in _ref) {
        value = _ref[key];
        env[key] = value;
      }
      if (this.port) {
        env['PORT'] = this.port;
      }
      env['PS'] = this.name;
      this.child = spawn('/bin/sh', ['-c', this.command], {
        env: env,
        cwd: this.cwd
      });
      this.stdout = this.child.stdout;
      return this.stderr = this.child.stderr;
    };

    Process.prototype.kill = function(callback) {
      if (this.child) {
        if (callback) {
          this.child.once('exit', callback);
        }
        return this.child.kill('SIGKILL');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    Process.prototype.terminate = function(callback) {
      if (this.child) {
        if (callback) {
          this.child.once('exit', callback);
        }
        return this.child.kill('SIGTERM');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    Process.prototype.quit = function(callback) {
      if (this.child) {
        if (callback) {
          this.child.once('exit', callback);
        }
        return this.child.kill('SIGQUIT');
      } else {
        return typeof callback === "function" ? callback() : void 0;
      }
    };

    return Process;

  })(EventEmitter);

  WebProcess = (function(_super) {

    __extends(WebProcess, _super);

    WebProcess.name = 'WebProcess';

    function WebProcess() {
      return WebProcess.__super__.constructor.apply(this, arguments);
    }

    WebProcess.prototype.timeout = 30000;

    WebProcess.prototype.spawn = function() {
      var _this = this;
      this.port = getOpenPort();
      WebProcess.__super__.spawn.apply(this, arguments);
      return tryConnect(this.port, this.timeout, function(err) {
        if (err) {
          return _this.emit('error', err);
        } else {
          return _this.emit('ready');
        }
      });
    };

    return WebProcess;

  })(Process);

  tryConnect = function(port, timeout, callback) {
    var decay, socket, timedOut, timeoutId;
    decay = 100;
    timedOut = false;
    timeoutId = setTimeout((function() {
      return timedOut = true;
    }), timeout);
    socket = new net.Socket;
    socket.on('connect', function() {
      clearTimeout(timeoutId);
      socket.destroy();
      return callback();
    });
    socket.on('error', function(err) {
      if (timedOut) {
        clearTimeout(timeoutId);
        return callback(err);
      } else if (err.code === 'ECONNREFUSED') {
        return setTimeout(function() {
          return socket.connect(port);
        }, decay *= 2);
      } else {
        clearTimeout(timeoutId);
        return callback(err);
      }
    });
    return socket.connect(port);
  };

  getOpenPort = function() {
    var port, server;
    server = net.createServer();
    server.listen(0);
    port = server.address().port;
    server.close();
    return port;
  };

  exports.createProcess = function() {
    var args, name;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (name.match(/^web/)) {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(WebProcess, [name].concat(__slice.call(args)), function(){});
    } else {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args), t = typeof result;
        return t == "object" || t == "function" ? result || child : child;
      })(Process, [name].concat(__slice.call(args)), function(){});
    }
  };

}