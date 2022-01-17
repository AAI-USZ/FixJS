function() {

      function Effect(dot, duration, options) {
        this.dot = dot;
        this.duration = duration;
        this.refresh = __bind(this.refresh, this);

        this.withEasing = __bind(this.withEasing, this);

        this.update = __bind(this.update, this);

        this.timeElapsed = 0;
        this.easing = options.easing || this.linearEasing;
        this.callback = options.callback;
      }

      Effect.prototype.linearEasing = function(progress) {
        return progress;
      };

      Effect.prototype.update = function(dt) {
        timeElapsed += dt;
        this.refresh(this.easing(timeElapsed / duration));
        if (timeElapsed > duration) {
          console.log("timeElapsed > duration");
          if (typeof this.callback === "function") {
            this.callback();
          }
          return false;
        } else {
          return true;
        }
      };

      Effect.prototype.withEasing = function(easing) {
        return this.easing = easing;
      };

      Effect.prototype.refresh = function(progress) {
        return "unimplemented";
      };

      return Effect;

    }