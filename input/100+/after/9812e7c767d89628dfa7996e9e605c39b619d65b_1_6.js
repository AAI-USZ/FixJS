function(property, color, times, options) {
    var $element = this;
    options = Object.append({delay: 0, duration: 500, timingFunction: 'easeIn', onStart: null, onFinish: null}, options || {});
    var animation = new Animation().addClip(Fx.highlight($element, property, color, times), options.delay, options.duration, options.timingFunction);
    animation.type = 'highlight';

    var queue;
    var prevAnimation;
    var playStartHandlers;
    var playFinishHandlers;
    if ((queue = queuePool[$element.uid]) && (prevAnimation = queue.getLast()).type === 'highlight') {
      if (queue.length === 1) {
        prevAnimation.off('playfinish.native').stop();
        delete queuePool[queue.id];
      } else {
        if (playStartHandlers = prevAnimation.events['playstart']) {
          animation.events['playstart'] = playStartHandlers;
        }
        queue.pop();
      }
      if (playFinishHandlers = prevAnimation.events['playfinish']) {
        animation.events['playfinish'] = playFinishHandlers;
      }
    }

    if (options.onStart) {
      animation.on('playstart', function(e) {
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