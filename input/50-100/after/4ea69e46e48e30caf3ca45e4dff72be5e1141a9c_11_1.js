function(runtime, session, observerCtor) {
  goog.base(this, runtime, 2);

  /**
   * Network session.
   * @private
   * @type {!gf.net.ServerSession}
   */
  this.session_ = session;

  /**
   * Observer constructor.
   * @private
   * @type {!gf.sim.ObserverCtor}
   */
  this.observerCtor_ = observerCtor;

  /**
   * Simulator network service.
   * @private
   * @type {!gf.sim.ServerSimulator.NetService_}
   */
  this.netService_ = new gf.sim.ServerSimulator.NetService_(this, session);
  this.registerDisposable(this.netService_);

  /**
   * A list of observers.
   * Observers watch for entity updates and should be checked every time entites
   * transition state in a tick.
   * @private
   * @type {!Array.<!gf.sim.Observer>}
   */
  this.observers_ = [];

  /**
   * Observers mapped by user session ID.
   * Provides a fast lookup when trying to send commands to specific users.
   * @private
   * @type {!Object.<!gf.sim.Observer>}
   */
  this.userObservers_ = {};

  /**
   * A list of commands that need to released after a full flush.
   * This is required because many commands are queued on multiple observers
   * and must only be released once. With this list it's possible to cleanup
   * all commands after all of the observers have processed.
   * @private
   * @type {!gf.sim.util.CommandList}
   */
  this.cleanupCommandList_ = new gf.sim.util.CommandList();
}