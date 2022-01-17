function() {
  if (this.isPlaying()) {
    return false;
  }

  this.onBegin();
  this.onPlay();

  this.startTime = goog.now();
  this.setStatePlaying();

  if (goog.style.transition.isSupported()) {
    goog.style.setStyle(this.element_, this.initialStyle_);
    // Allow element to get updated to its initial state before installing
    // CSS3 transition.
    this.timerId_ = goog.Timer.callOnce(this.play_, undefined, this);
    return true;
  } else {
    this.stop_(false);
    return false;
  }
}