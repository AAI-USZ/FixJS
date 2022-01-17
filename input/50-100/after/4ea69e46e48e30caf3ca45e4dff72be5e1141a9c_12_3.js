function(frame) {
  // Clean up the dirty entity list and reset state
  for (var n = 0; n < this.dirtyEntitiesLength_; n++) {
    var entity = this.dirtyEntities_[n];
    goog.asserts.assert(entity);
    this.dirtyEntities_[n] = null;

    // Reset entity state
    entity.resetDirtyState();
  }
  this.dirtyEntitiesLength_ = 0;
}