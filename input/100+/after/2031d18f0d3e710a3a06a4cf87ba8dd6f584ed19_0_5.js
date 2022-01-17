function() {
        var d, delay, dot, duration, endColor, endRadius, i, j, nx, ny, startColor, startRadius, x, y, _i, _ref, _ref1, _results;
        console.log("wtf");
        x = this.smallimap.longToX(this.longitude);
        y = this.smallimap.latToY(this.latitude);
        _results = [];
        for (i = _i = _ref = -this.eventRadius, _ref1 = this.eventRadius; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref2, _ref3, _results1;
            _results1 = [];
            for (j = _j = _ref2 = -this.eventRadius, _ref3 = this.eventRadius; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j = _ref2 <= _ref3 ? ++_j : --_j) {
              nx = x + i;
              ny = y + j;
              d = Math.sqrt(i * i + j * j);
              if (this.smallimap.grid[nx] && this.smallimap.grid[nx][ny]) {
                dot = this.smallimap.grid[nx][ny];
                delay = this.duration * d / this.eventRadius;
                duration = this.duration - delay;
                startColor = dot.initial.color;
                startRadius = dot.initial.radius;
                endColor = new Color(this.color.rgbString());
                endRadius = this.smallimap.dotRadius;
                if (duration > 0) {
                  _results1.push("wtf");
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