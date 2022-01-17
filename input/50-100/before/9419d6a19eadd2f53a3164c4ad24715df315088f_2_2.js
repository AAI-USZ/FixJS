function(time) {
  var flags = this.getFlags();

  // Interpolate all interpolated vars
  if (flags & gf.sim.EntityFlag.INTERPOLATED) {
    this.interpolate_(time);
  }

  // Reset predicted vars to confirmed in preparation for the predicted commands
  if (flags & gf.sim.EntityFlag.PREDICTED) {
    this.state_.copyPredictedVariables(this.clientState_);
  }
}