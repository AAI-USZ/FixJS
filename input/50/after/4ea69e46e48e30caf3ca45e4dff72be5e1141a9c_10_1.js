function(simulator, entityType, entityId, entityFlags) {
  goog.base(this, simulator, entityType, entityId, entityFlags);

  /**
   * Owning user, if any.
   * An owning user generally has more permission to modify an entity than
   * others. For example, an owning user can issue kill commands on themselves
   * but not on anyone else.
   * @private
   * @type {gf.net.User}
   */
  this.owner_ = null;

  /**
   * Current entity state.
   * This is the authoritative state that is replicated to all observers.
   * It is kept consistent each server tick.
   * @protected
   * @type {!gf.sim.EntityState}
   */
  this.state = entityType.allocateState(this);
}