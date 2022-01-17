function(_super) {

    __extends(Pool, _super);

    Pool.name = 'Pool';

    function Pool(name, command, options) {
      var instance, _i, _ref, _ref1;
      this.name = name;
      this.command = command;
      if (options == null) {
        options = {};
      }
      this.concurrency = (_ref = options.concurrency) != null ? _ref : 1;
      this.processes = [];
      for (instance = _i = 1, _ref1 = this.concurrency; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; instance = 1 <= _ref1 ? ++_i : --_i) {
        this.processes.push(createProcess("" + this.name + "." + instance, this.command, options));
      }
    }

    Pool.prototype.spawn = function() {
      var process, _i, _len, _ref, _results;
      _ref = this.processes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        process = _ref[_i];
        process.spawn();
        _results.push(this.emit('process:spawn', process));
      }
      return _results;
    };

    Pool.prototype.kill = function(callback) {
      var kill;
      kill = function(process, cb) {
        return process.kill(cb);
      };
      return async.forEach(this.processes, kill, callback);
    };

    Pool.prototype.terminate = function(callback) {
      var terminate;
      terminate = function(process, cb) {
        return process.terminate(cb);
      };
      return async.forEach(this.processes, terminate, callback);
    };

    Pool.prototype.quit = function(callback) {
      var quit;
      quit = function(process, cb) {
        return process.quit(cb);
      };
      return async.forEach(this.processes, quit, callback);
    };

    return Pool;

  }