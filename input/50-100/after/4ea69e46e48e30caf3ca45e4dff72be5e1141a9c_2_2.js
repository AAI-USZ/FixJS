function() {
  // Release entity states back to the pool
  this.entityType.releaseState(this.networkState);
  for (var n = 0; n < this.previousStates.length; n++) {
    this.entityType.releaseState(this.previousStates[n]);
  }
  if (this.getFlags() & (
      gf.sim.EntityFlag.INTERPOLATED | gf.sim.EntityFlag.PREDICTED)) {
    this.entityType.releaseState(this.state);
  }

  goog.base(this, 'disposeInternal');
}