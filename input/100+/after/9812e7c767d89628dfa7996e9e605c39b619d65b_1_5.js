function(styles, options) {
    var $element = this;
    options = Object.append({delay: 0, duration: 400, timingFunction: 'ease', onStart: null, onFinish: null}, options || {});
    var animation = new Animation().addClip(Fx.morph($element, styles), options.delay, options.duration, options.timingFunction);
    animation.type = 'morph';
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