function() {
  this.dirtyFlags = 0;

  // When this is called we've already flushed deltas, so reset the bits
  this.state_.resetDirtyState();
  if (gf.CLIENT && this.clientState_) {
    this.clientState_.resetDirtyState();
  }
}