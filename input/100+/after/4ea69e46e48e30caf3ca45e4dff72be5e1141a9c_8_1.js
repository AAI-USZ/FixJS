function(simulator, session, user) {
  goog.base(this);

  /**
   * Server simulator.
   * @private
   * @type {!gf.sim.ServerSimulator}
   */
  this.simulator_ = simulator;

  /**
   * Network session.
   * @private
   * @type {!gf.net.ServerSession}
   */
  this.session_ = session;

  /**
   * The user this observer is representing.
   * @private
   * @type {!gf.net.User}
   */
  this.user_ = user;

  /**
   * Last confirmed sequence number.
   * @private
   * @type {number}
   */
  this.confirmedSequence_ = 0;

  /**
   * List of incoming commands from the network.
   * Commands will be processed on the next update.
   * @private
   * @type {!gf.sim.util.CommandList}
   */
  this.incomingCommandList_ = new gf.sim.util.CommandList();

  /**
   * A list of pending commands to send to the observer on the next flush.
   * This list is not filtered by relevance and must be checked on flush.
   * @private
   * @type {!gf.sim.util.CommandList}
   */
  this.outgoingCommandList_ = new gf.sim.util.CommandList();

  /**
   * A set of entities currently tracked by this observer.
   * Tracked entities have been fully replicated and, on update, can have just
   * their deltas sent. If an entity is not in this set, is updated, and has
   * just become relevant then it must be added and fully replicated.
   * @private
   * @type {!Object.<number, boolean>}
   */
  this.trackedEntities_ = {};

  /**
   * A set of all dirty entities, mapped by entity ID.
   * This list is updated over the course of a server tick with all of the
   * entities that have changed and need synchronization.
   * The value is the OR of all dirty flags that have been seen since the entity
   * was last flushed. This allows for accumulation of multiple ticks worth of
   * change events before flushing.
   * @private
   * @type {!Object.<number, number>}
   */
  this.updatedEntitiesSet_ = {};

  /**
   * A list matching the set of entities in {@see #updatedEntitiesSet_}, kept
   * for fast iteration.
   * Check {@see gf.sim.ServerEntity#dirtyFlags} to see whether the entity was
   * created, updated, and/or deleted this tick.
   * This list is cleared after every tick.
   * @private
   * @type {!Array.<!gf.sim.ServerEntity>}
   */
  this.updatedEntitiesList_ = [];

  /**
   * The last time the observer was flushed.
   * This is used to throttle updates so that they are not sent too frequently.
   * @private
   * @type {number}
   */
  this.lastFlushTime_ = 0;

  /**
   * Sync packet writer.
   * @private
   * @type {!gf.sim.util.SyncSimulationWriter}
   */
  this.writer_ = new gf.sim.util.SyncSimulationWriter();
}