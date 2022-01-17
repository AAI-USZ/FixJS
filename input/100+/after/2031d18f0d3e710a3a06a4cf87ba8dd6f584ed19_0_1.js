function() {
        var dt, event, now, ongoingEvents, x, y, _i, _j, _k, _l, _len, _ref, _ref1, _ref2, _ref3;
        now = new Date().getTime();
        dt = now - this.lastRefresh;
        this.lastRefresh = now;
        ongoingEvents = [];
        _ref = this.eventQueue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          event = _ref[_i];
          if (event.refresh(dt)) {
            ongoingEvents.push(event);
          }
        }
        this.eventQueue = ongoingEvents;
        if (!this.dirtyXs) {
          this.dirtyXs = [];
          for (x = _j = 0, _ref1 = this.width - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
            this.dirtyXs[x] = true;
          }
        }
        for (x = _k = 0, _ref2 = this.width - 1; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; x = 0 <= _ref2 ? ++_k : --_k) {
          if (this.dirtyXs[x]) {
            this.dirtyXs[x] = false;
            for (y = _l = 0, _ref3 = this.height - 1; 0 <= _ref3 ? _l <= _ref3 : _l >= _ref3; y = 0 <= _ref3 ? ++_l : --_l) {
              if (this.grid[x][y].dirty) {
                this.render(x, y);
              }
            }
          }
        }
        return requestAnimationFrame(this.refresh);
      }