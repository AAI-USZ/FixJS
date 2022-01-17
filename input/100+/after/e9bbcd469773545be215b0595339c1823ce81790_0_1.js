function(callback) {
      var counter, done, fired, that;
      that = {};
      counter = 1;
      done = false;
      fired = false;
      if (!(callback != null)) {
        that.increment = function() {};
        that.decrement = that.increment;
        that.done = that.increment;
        that.add = function(v) {};
      } else {
        that.increment = function() {
          return counter += 1;
        };
        that.add = function(n) {
          return counter += n;
        };
        that.decrement = function() {
          counter -= 1;
          if (counter <= 0 && done && !fired) {
            fired = true;
            callback();
          }
          return counter;
        };
        that.done = function() {
          done = true;
          return that.decrement();
        };
      }
      return that;
    }