function(simulator, entityType, entityId, entityFlags) {
  goog.base(this, simulator, entityType, entityId, entityFlags, stateType);

  /**
   * Server state snapshot.
   * Automatically kept in sync with the server, updated each time a new sync
   * packet is received in the simulation update flow.
   * For prediction this is the last confirmed state.
   * @protected
   * @type {!gf.sim.EntityState}
   */
  this.networkState = entityType.allocateState();

  /**
   * Entity state history.
   * Used for interpolation, this history tracks state from the server at each
   * snapshot. It is used to update the state with the values as interpolated
   * on the server. Only valid if the entity has
   * {@see gf.sim.EntityFlag#INTERPOLATED} set.
   * @protected
   * @type {!Array.<!gf.sim.EntityState>}
   */
  this.previousStates = [];

  /**
   * Client state.
   * Represents the state of the entity on the client, factoring in either
   * interpolation or prediction. If neither feature is enabled then this is
   * identical to {@see #networkState}.
   * @protected
   * @type {!gf.sim.EntityState}
   */
  this.state = (entityFlags & (
      gf.sim.EntityFlag.INTERPOLATED | gf.sim.EntityFlag.PREDICTED)) ?
      entityType.allocateState() : this.networkState;
}