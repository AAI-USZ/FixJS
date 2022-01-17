function(nx, ny, d, dot) {
        var delay, endColor, endRadius, fadeInDuration, fadeOutDuration, ratio, startColor, startRadius,
          _this = this;
        ratio = Math.sqrt(d / this.eventRadius * this.weight);
        delay = this.duration / 9 * ratio;
        fadeInDuration = this.duration / 9 * (1 - ratio);
        fadeOutDuration = this.duration * 8 / 9 * (1 - ratio);
        startColor = dot.initial.color;
        startRadius = dot.initial.radius;
        endColor = new Color(this.color.rgbString()).mix(startColor, ratio * ratio);
        if (startRadius >= this.smallimap.dotRadius * 0.5) {
          endRadius = startRadius - startRadius * 0.5 * (1 - ratio);
        } else {
          endRadius = (this.smallimap.dotRadius - startRadius) * (1 - ratio) + startRadius;
        }
        if (fadeInDuration > 0) {
          return this.enqueue(new DelayEffect(dot, delay, {
            callback: function() {
              _this.enqueue(new ColorEffect(dot, fadeInDuration, {
                startColor: startColor,
                endColor: endColor,
                easing: easing.quadratic,
                callback: function() {
                  return _this.enqueue(new ColorEffect(dot, fadeOutDuration, {
                    startColor: endColor,
                    endColor: startColor,
                    easing: Math.sqrt
                  }));
                }
              }));
              return _this.enqueue(new RadiusEffect(dot, fadeInDuration, {
                startRadius: startRadius,
                endRadius: endRadius,
                easing: easing.linear,
                callback: function() {
                  return _this.enqueue(new RadiusEffect(dot, fadeOutDuration, {
                    startRadius: endRadius,
                    endRadius: startRadius,
                    callback: function() {}
                  }));
                }
              }));
            }
          }));
        }
      }