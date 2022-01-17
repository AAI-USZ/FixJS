function() {
  // Return entity states back to the pool
  this.factory.releaseState(this.state_);
  if (gf.CLIENT && this.clientState_) {
    this.factory.releaseState(this.clientState_);
  }
  for (var n = 0; n < this.previousStates_.length; n++) {
    this.factory.releaseState(this.previousStates_[n]);
  }

  goog.base(this, 'disposeInternal');
}