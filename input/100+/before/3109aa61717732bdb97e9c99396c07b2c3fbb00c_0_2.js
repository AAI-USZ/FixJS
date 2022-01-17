function() {

      function Event(smallimap, callback) {
        this.smallimap = smallimap;
        this.callback = callback;
        this.refresh = __bind(this.refresh, this);

        this.init = __bind(this.init, this);

        this.queue = [];
      }

      Event.prototype.enqueue = function(effect) {
        return this.queue.push(effect);
      };

      Event.prototype.init = function() {
        return "no init, dude";
      };

      Event.prototype.refresh = function(dt) {
        var effect, ongoingEffects, _i, _len, _ref;
        ongoingEffects = [];
        _ref = this.queue;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          effect = _ref[_i];
          if (effect.refresh(dt)) {
            ongoingEffects.push(effect);
          }
        }
        this.queue = ongoingEffects;
        return this.queue.length > 0;
      };

      return Event;

    }