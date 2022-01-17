function(simulator, entityFactory, entityId, entityFlags) {
  goog.base(this);

  goog.asserts.assert(entityId != gf.sim.NO_ENTITY_ID);

  /**
   * Owning simulator.
   * @protected
   * @type {!gf.sim.Simulator}
   */
  this.simulator = simulator;

  /**
   * Entity type factory.
   * @protected
   * @type {!gf.sim.EntityFactory}
   */
  this.factory = entityFactory;

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
   * Session-unique entity ID.
   * The LSB of the entity ID denotes whether it is replicated (0) or
   * client-only (1), ensuring no mixups with client-side IDs.
   * @private
   * @type {number}
   */
  this.entityId_ = entityId;

  /**
   * A bitmask of {@see gf.sim.EntityFlag} indicating the behavior and
   * replication properties of the entity.
   * @private
   * @type {number}
   */
  this.entityFlags_ = entityFlags;

  /**
   * Parent entity.
   * @private
   * @type {gf.sim.Entity}
   */
  this.parent_ = null;

  /**
   * Child entities.
   * Not replicated over the network, but inferred from the parenting
   * relationships.
   * @private
   * @type {!Array.<!gf.sim.Entity>}
   */
  this.children_ = [];

  /**
   * A bitmask of {@see gf.sim.EntityDirtyFlag} indicating the dirty state
   * of the entity.
   * This value is tracked per tick and will be reset.
   * @type {number}
   */
  this.dirtyFlags = 0;

  /**
   * Current entity state.
   * This is the authoritative state that is replicated to all observers.
   * It is kept consistent each server tick. On clients, it is the last received
   * state from the server. For prediction this is the last confirmed state.
   * @private
   * @type {!gf.sim.EntityState}
   */
  this.state_ = entityFactory.allocateState(this);

  if (gf.CLIENT) {
    // Whether we need a seperate client state
    var splitState = entityFlags & (
        gf.sim.EntityFlag.INTERPOLATED | gf.sim.EntityFlag.PREDICTED);

    /**
     * Client interpolated/predicted state.
     * Represents the state of the entity on the client, factoring in either
     * interpolation or prediction. If neither feature is enabled then this is
     * identical to {@see #networkState}.
     * @private
     * @type {gf.sim.EntityState}
     */
    this.clientState_ = splitState ? entityFactory.allocateState(this) : null;
  }

  // TODO(benvanik): also use for lag compensation history rewinding on server
  /**
   * Entity state history.
   * Used for interpolation, this history tracks state from the server at each
   * snapshot. It is used to update the state with the values as interpolated
   * on the server. Only valid if the entity has
   * {@see gf.sim.EntityFlag#INTERPOLATED} set.
   * @private
   * @type {!Array.<!gf.sim.EntityState>}
   */
  this.previousStates_ = [];
}