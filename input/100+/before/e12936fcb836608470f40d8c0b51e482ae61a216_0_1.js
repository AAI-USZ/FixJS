function() {
      var cb,
        _this = this;
      if (this.day < this.config.max_days) {
        cb = function() {
          _this.day += 1;
          $(_this).trigger('pre-tick');
          _this.tick();
          $(_this).trigger('post-tick');
          if (_this.day > _this.config.max_days) {
            _this.stop;
            return $(_this).trigger('end');
          }
        };
        cb();
        return this.interval_id = setInterval(cb, this.config.rate);
      }
    }