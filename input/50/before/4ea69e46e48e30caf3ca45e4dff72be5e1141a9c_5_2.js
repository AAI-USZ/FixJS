function() {
  // As an optimization, only make the call if we really need to
  var wasDirty = !!this.dirtyFlags;
  this.dirtyFlags |= gf.sim.EntityDirtyFlag.UPDATED;
  if (!wasDirty) {
    this.simulator_.invalidateEntity(this);
  }
}