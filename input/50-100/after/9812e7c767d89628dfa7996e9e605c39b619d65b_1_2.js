function() {
    var animation = this;
    if (animation.status !== START_POINT) {
      animation.timePoint = 0;
      animation.status = START_POINT;
      animation.clips.forEach(function(clip) {
        clip.call(animation, 0, 0);
        clip.status = BEFORE_START_POINT;
      });
      if (animation.timestamp) {
        unmountAnimation(animation);
      }
      animation.fire('stop');
    }
    return animation;
  }