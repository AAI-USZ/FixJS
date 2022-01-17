function(time) {
  var flags = this.getFlags();

  // Skip if nothing to do
  if (!this.clientState_) {
    return;
  }

  // Copy uninterpolated variables to stay consistent
  // TODO(benvanik): find a way to avoid this copy - perhaps double read on
  //     the network
  // TODO(benvanik): only those marked dirty on state
  this.state_.copyImmediateVariables(this.clientState_);

  // Interpolate all interpolated vars
  if (flags & gf.sim.EntityFlag.INTERPOLATED) {
    this.interpolate_(time);
  }

  // Reset predicted vars to confirmed in preparation for the predicted commands
  if (flags & gf.sim.EntityFlag.PREDICTED) {
    goog.asserts.assert(this.clientState_);
    this.state_.copyPredictedVariables(this.clientState_);
  }
}