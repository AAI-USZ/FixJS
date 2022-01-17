function(nx, ny, d, dot) {
        var delay, endColor, endRadius, fadeInDuration, fadeOutDuration, ratio, startColor, startRadius,
          _this = this;
        ratio = Math.sqrt(d / this.eventRadius * this.weight);
        delay = this.duration * ratio / 2;
        fadeInDuration = this.duration / 9 * (1 - ratio);
        fadeOutDuration = this.duration * 8 / 9 * (1 - ratio);
        startColor = dot.initial.color;
        startRadius = dot.initial.radius;
        endColor = new Color(this.color.rgbString()).mix(startColor, ratio);
        endRadius = (this.smallimap.dotRadius - startRadius) * this.weight / (d + 1) + startRadius;
        if (fadeInDuration > 0) {
          return this.enqueue(new DelayEffect(dot, delay, {
            callback: function() {
              return _this.enqueue(new ColorEffect(dot, fadeInDuration, {
                startColor: startColor,
                endColor: endColor,
                easing: easing.quadratic,
                callback: function() {
                  return _this.enqueue(new ColorEffect(dot, fadeOutDuration, {
                    startColor: endColor,
                    endColor: startColor,
                    easing: easing.inverse(easing.quadratic)
                  }));
                }
              }));
            }
          }));
        }
      }