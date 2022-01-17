function() {
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
                    endRadius: startRadius
                  }));
                }
              }));
            }