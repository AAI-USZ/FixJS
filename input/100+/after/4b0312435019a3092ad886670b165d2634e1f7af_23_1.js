function() {

    Logger.DEBUG = 0;

    Logger.INFO = 1;

    Logger.WARN = 2;

    Logger.ERROR = 3;

    Logger.FATAL = 4;

    function Logger() {
      this.logged = new Signal;
      this.stack = [];
    }

    Logger.prototype.log = function(message, level) {
      var o;
      if (level == null) {
        level = 0;
      }
      o = {
        message: message,
        level: level
      };
      if (this.logged.hasListeners()) {
        return this.logged.dispatch(this, o);
      } else {
        if (this.stack.empty() || this.stack.last().level !== level) {
          return this.stack.push(o);
        } else {
          return this.stack.last().message += message;
        }
      }
    };

    Logger.prototype.add = function(listener, context, priority) {
      var log, _i, _len, _ref, _results;
      if (context == null) {
        context = null;
      }
      if (priority == null) {
        priority = 0;
      }
      this.logged.add(listener, context, priority);
      if (this.logged.hasListeners()) {
        _ref = this.stack;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          log = _ref[_i];
          _results.push(this.logged.dispatch(this, log));
        }
        return _results;
      }
    };

    Logger.prototype.remove = function(listener, context) {
      return this.logged.remove(listener, context);
    };

    return Logger;

  }