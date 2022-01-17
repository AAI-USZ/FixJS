function() {
        var d, delay, dot, duration, endColor, endRadius, i, j, nx, ny, startColor, startRadius, x, y, _i, _ref, _ref1, _results;
        x = this.smallimap.longToX(this.longitude);
        y = this.smallimap.latToY(this.latitude);
        _results = [];
        for (i = _i = _ref = -this.radius, _ref1 = this.radius; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref2, _ref3, _results1,
              _this = this;
            _results1 = [];
            for (j = _j = _ref2 = -this.radius, _ref3 = this.radius; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j = _ref2 <= _ref3 ? ++_j : --_j) {
              nx = x + i;
              ny = y + j;
              d = Math.sqrt(i * i + j * j);
              if (this.smallimap.grid[nx] && this.smallimap.grid[nx][ny]) {
                dot = this.grid[nx][ny];
                delay = this.duration * d / this.radius;
                duration = this.duration - delay;
                startColor = dot.initial.color;
                startRadius = dot.initial.radius;
                endColor = new Color(this.color.rgbString());
                endRadius = (this.dotRadius - startRadius) / (d + 1) + startRadius;
                if (duration > 0) {
                  this.enqueue(new ColorEffect(dot, duration, {
                    startColor: startColor,
                    endColor: endColor,
                    callback: function() {
                      return _this.enqueue(new ColorEffect(dot, duration, {
                        startColor: endColor,
                        endColor: startColor
                      }));
                    }
                  }));
                  _results1.push(this.enqueue(new RadiusEffect(dot, duration, {
                    startRadius: startRadius,
                    endRadius: endRadius,
                    callback: function() {
                      return _this.enqueue(new RadiusEffect(dot, duration, {
                        startRadius: endRadius,
                        endRadius: startRadius
                      }));
                    }
                  })));
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }