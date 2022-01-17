function(nx, ny, d, dot) {
        var delay, duration, endColor, endRadius, startColor, startRadius,
          _this = this;
        delay = this.duration * d / (this.eventRadius + 1);
        duration = this.duration - delay;
        startColor = dot.initial.color;
        startRadius = dot.initial.radius;
        endColor = new Color(this.color.rgbString()).mix(startColor, d / this.eventRadius * (1 - this.weight));
        endRadius = (this.smallimap.dotRadius - startRadius) * this.weight / (d + 1) + startRadius;
        if (duration > 0) {
          this.enqueue(new DelayEffect(dot, delay, {
            callback: function() {
              return _this.enqueue(new ColorEffect(dot, duration / 9, {
                startColor: startColor,
                endColor: endColor,
                easing: easing.quadratic,
                callback: function() {
                  return _this.enqueue(new ColorEffect(dot, duration * 8 / 9, {
                    startColor: endColor,
                    endColor: startColor,
                    easing: easing.inverse(easing.quadratic)
                  }));
                }
              }));
            }
          }));
          return this.enqueue(new DelayEffect(dot, delay, {
            callback: function() {
              return _this.enqueue(new RadiusEffect(dot, duration / 9, {
                startRadius: startRadius,
                endRadius: endRadius,
                easing: easing.cubic,
                callback: function() {
                  return _this.enqueue(new RadiusEffect(dot, duration * 8 / 9, {
                    startRadius: endRadius,
                    endRadius: startRadius
                  }));
                }
              }));
            }
          }));
        }
      }