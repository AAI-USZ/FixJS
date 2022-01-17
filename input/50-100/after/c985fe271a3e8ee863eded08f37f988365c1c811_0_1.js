function(stopped) {
  goog.style.transition.removeAll(this.element_);

  // Clear the timer.
  goog.Timer.clear(this.timerId_);

  // Make sure that we have reached the final style.
  goog.style.setStyle(this.element_, this.finalStyle_);

  this.endTime = goog.now();
  this.setStateStopped();

  if (stopped) {
    this.onStop();
  } else {
    this.onFinish();
  }
  this.onEnd();
}