function() {
        var key;
        if (!_this.min_level) return false;
        for (key in _this) {
          if (key === _this.min_level) return false;
          if (key === method) return true;
        }
      }