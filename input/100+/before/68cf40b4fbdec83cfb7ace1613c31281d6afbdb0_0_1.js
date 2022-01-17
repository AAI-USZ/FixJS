function(game, camera) {
  dotprod.views.View.call(this);

  /**
   * @type {!dotprod.Game}
   * @private
   */
  this.game_ = game;

  /**
   * @type {!dotprod.Camera}
   * @private
   */
  this.camera_ = camera;

  /**
   * @type {!HTMLDivElement}
   * @private
   */
  this.latency_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));

  /**
   * @type {!HTMLDivElement}
   * @private
   */
  this.framerate_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));

  /**
   * @type {!HTMLDivElement}
   * @private
   */
  this.position_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));

  /**
   * @type {!HTMLDivElement}
   * @private
   */
  this.players_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));

  /**
   * @type {!HTMLDivElement}
   * @private
   */
  this.projectiles_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));

  /**
   * @type {number}
   * @private
   */
  this.lastTime_ = goog.now();

  /**
   * @type {number}
   * @private
   */
  this.frames_ = 0;
}