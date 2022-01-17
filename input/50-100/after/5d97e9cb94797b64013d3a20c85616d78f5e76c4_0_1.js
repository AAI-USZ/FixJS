function() {
  /**
   * @type {!Object.<number, boolean>}
   * @private
   */
  this.keys_ = {};

  goog.events.listen(document, this.getVisibilityEvent_(), goog.bind(this.documentVisibilityChanged_, this));
  goog.events.listen(window, goog.events.EventType.KEYDOWN, goog.bind(this.keyPressed_, this));
  goog.events.listen(window, goog.events.EventType.KEYUP, goog.bind(this.keyReleased_, this));
}