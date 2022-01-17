function() {
  if (goog.Disposable.ENABLE_MONITORING) {
    this.creationStack = new Error().stack;
    goog.Disposable.instances_[goog.getUid(this)] = this;
  }
}