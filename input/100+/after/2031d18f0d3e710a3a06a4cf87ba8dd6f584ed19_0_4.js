function(dt) {
        var effect, ongoingEffects, _i, _len, _ref;
        ongoingEffects = [];
        _ref = this.queue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          effect = _ref[_i];
          if (effect.update(dt)) {
            ongoingEffects.push(effect);
          }
        }
        this.queue = ongoingEffects;
        return this.queue.length > 0;
      }