function(property, color, times, options) {
    var queue = queuePool[this.uid];
    if (queue) {
      if (queue.length === 0) {
        if (queue.currentAnimation.clips[0].type === 'highlight') {
          queue.currentAnimation.stop().play();
          return this;
        }
      } else {
        if (queue[queue.length - 1].clips[0].type === 'highlight') {
          return this;
        }
      }
    }

    var $element = this;
    options = Object.append({delay: 0, duration: 500, timingFunction: 'easeIn', onStart: null, onFinish: null}, options || {});
    var animation = new Animation().addClip(Fx.highlight($element, property, color, times), options.delay, options.duration, options.timingFunction);
    if (options.onStart) {
      animation.on('playstart', function(e) {
        this.off('playstart');
        options.onStart.call($element, e);
      });
    }
    if (options.onFinish) {
      animation.on('playfinish', function(e) {
        options.onFinish.call($element, e);
      });
    }
    appendToQueue($element.uid, animation);
    return $element;

  }