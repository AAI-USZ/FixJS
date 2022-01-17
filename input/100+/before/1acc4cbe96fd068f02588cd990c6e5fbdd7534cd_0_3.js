function(e) {
          var key;
          if (e == null) return;
          key = e.which;
          if (key === KEYS.up || key === KEYS.pgup || key === KEYS.down || key === KEYS.pgdown || key === KEYS.home || key === KEYS.end) {
            _this.sliderY = isNaN(_this.sliderY) ? 0 : _this.sliderY;
            KEYSTATES[key] = setTimeout(function() {
              _this.handleKeyPress(key);
            }, 100);
            e.preventDefault();
          }
        }