function() {

    function TronTestFramework() {}

    TronTestFramework.prototype._name_of_function = function(fn) {
      var key, value;
      for (key in this) {
        value = this[key];
        if (value === fn) return key;
      }
    };

    TronTestFramework.prototype.run = function(seq) {
      var check, checks, color, error, k, name, pre, _i, _len, _ref;
      if (seq == null) seq = undefined;
      pre = tron.test_log;
      checks = [];
      tron.test_log = function(fn) {
        return checks.push(fn);
      };
      if (seq != null) {
        try {
          color = special('green');
          this[seq]();
          tron.log("" + color + seq + " passed.");
          for (_i = 0, _len = checks.length; _i < _len; _i++) {
            _ref = checks[_i], check = _ref[0], error = _ref[1];
            name = this._name_of_function(check);
            if (!error) {
              tron.log(".." + name + " passed.");
            } else {
              color = special('red');
              tron.warn("" + color + "..failure in " + name + ":");
              tron.log(special('clear'));
              tron.trace(error);
              tron.log();
            }
          }
        } catch (error) {
          color = special('red');
          tron.warn("" + color + "failure in " + seq + ":\n");
          tron.trace(error);
        } finally {
          tron.log(special('clear'));
        }
      } else {
        for (k in this) {
          if (k.slice(0, 4) === 'try_') this.run(k);
        }
      }
      return tron.test_log = pre;
    };

    return TronTestFramework;

  }