function(runtime, baseEntityId) {
  goog.base(this, runtime);

  /**
   * Event scheduler.
   * @private
   * @type {!gf.sim.Scheduler}
   */
  this.scheduler_ = new gf.sim.Scheduler(runtime);
  this.registerDisposable(this.scheduler_);

  /**
   * Command type descriptors mapped by type ID.
   * @private
   * @type {!Object.<number, !gf.sim.CommandType>}
   */
  this.commandTypes_ = {};

  /**
   * Entity type descriptors mapped by type ID.
   * @private
   * @type {!Object.<number, !gf.sim.EntityType>}
   */
  this.entityTypes_ = {};

  /**
   * Next entity ID to give out to requesters.
   * Always incremented by two to preserve the baseEntityId LSB.
   * This ensures clients get LSB=1, servers get LSB=0.
   * @private
   * @type {number}
   */
  this.nextEntityId_ = baseEntityId;

  // TODO(benvanik): potentially move this to some kind of hierarchy
  /**
   * All entities the simulator knows about.
   * On the server this is all entities. On the client this is only those
   * entities the server has chosen to replicate with it or have been predicted
   * by the client.
   * @private
   * @type {!Object.<number, !gf.sim.Entity>}
   */
  this.entities_ = {};

  /**
   * Dirty entities list.
   * The list is not reallocated each frame and the length should not be
   * trusted - instead, use {@see dirtyEntitiesLength_}.
   * @private
   * @type {!Array.<!gf.sim.Entity>}
   */
  this.dirtyEntities_ = new Array(128);

  /**
   * Current length of the {@see #dirtyEntities_} list.
   * @private
   * @type {number}
   */
  this.dirtyEntitiesLength_ = 0;
}