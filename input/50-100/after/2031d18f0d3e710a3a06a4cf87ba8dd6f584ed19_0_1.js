function Effect(dot, duration, options) {
        this.dot = dot;
        this.duration = duration;
        this.refresh = __bind(this.refresh, this);

        this.update = __bind(this.update, this);

        this.timeElapsed = 0;
        this.easing = options.easing || this.linearEasing;
        this.callback = options.callback;
      }