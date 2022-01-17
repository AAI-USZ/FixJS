function() {
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