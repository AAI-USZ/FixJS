function() {
  if (!this.isPlaying()) return;

  if (this.timerId_) {
    goog.Timer.clear(this.timerId_);
    this.timerId_ = 0;
  }
  this.stop_(true);
}