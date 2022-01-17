function(fxRenderer, delay, duration, timingFunction) {
    // 使用各项配置组合影片剪辑（实际是将渲染器升级为影片剪辑）。
    fxRenderer.delay = delay;
    fxRenderer.duration = duration;
    fxRenderer.timingFunction = getTimingFunction(timingFunction);
    fxRenderer.status = BEFORE_START_POINT;
    this.clips.push(fxRenderer);
    // 重新计算整个动画持续的时间。
    this.duration = Math.max(this.duration, delay + duration);
    return this;
  }