function() {
                  return _this.enqueue(new ColorEffect(dot, fadeOutDuration, {
                    startColor: endColor,
                    endColor: startColor,
                    easing: Math.sqrt
                  }));
                }