function(frame) {
  // Flush observers
  for (var n = 0; n < this.observers_.length; n++) {
    var observer = this.observers_[n];
    observer.flush(frame.time);
  }

  // Cleanup any outstanding release requests
  this.cleanupCommandList_.releaseAllCommands(this);

  goog.base(this, 'postUpdate', frame);
}