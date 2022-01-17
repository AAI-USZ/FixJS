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
  this.view_ = /** @type {!HTMLDivElement} */ (goog.dom.createElement('div'));
  this.view_.classList.add(dotprod.views.DebugView.VIEW_CLASS_NAME_);

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