function() {
        if (_this.day >= _this.config.max_days) {
          _this.stop();
          return $(_this).trigger('end');
        } else {
          $(_this).trigger('pre-tick');
          _this.tick();
          return $(_this).trigger('post-tick');
        }
      }