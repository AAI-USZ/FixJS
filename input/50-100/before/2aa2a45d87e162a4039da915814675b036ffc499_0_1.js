function() {
        if (LEVELS[level] >= allowedLevel) {
          var args = Array.prototype.slice.call(arguments);
          args.splice(0, 0, level);
          log.apply(this, args);
        }
      }