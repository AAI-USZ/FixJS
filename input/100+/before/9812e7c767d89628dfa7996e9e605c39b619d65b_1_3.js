function(reverse) {
    var animation = this;
    var isPlayMethod = reverse !== INTERNAL_IDENTIFIER_REVERSE;
    var status = animation.status;
    if (isPlayMethod && status != PLAYING && status != END_POINT || !isPlayMethod && status != REVERSING && status != STARTING_POINT) {
      animation.fire(isPlayMethod ? 'play' : 'reverse');
      animation.status = isPlayMethod ? PLAYING : REVERSING;
      // 未挂载到引擎（执行此方法前为暂停/停止状态）。
      if (!animation.timestamp) {
        var timePoint = animation.timePoint;
        var duration = animation.duration;
        // 每次播放/反向播放时的首帧同步播放。
        playAnimation(animation, timePoint ? timePoint : (isPlayMethod ? 0 : duration), isPlayMethod);
        // 如果动画超出一帧，则将其挂载到动画引擎，异步播放中间帧及末帧。
        if (duration) {
          mountAnimation(animation);
        }
      }
    }
    return animation;
  }