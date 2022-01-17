function() {
    var animation = this;
    if (animation.status !== STARTING_POINT) {
      animation.timePoint = 0;
      animation.status = STARTING_POINT;
      animation.clips.forEach(function(clip) {
        clip.status = BEFORE_STARTING_POINT;
      });
      if (animation.timestamp) {
        unmountAnimation(animation);
      }
      animation.fire('stop');
    }
    return animation;
  }