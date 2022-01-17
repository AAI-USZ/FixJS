function(specId, cache, entity) {

  goog.events.EventTarget.call(this);



  /**

   * @private

   * @type {!Object}

   */

  this.entity_ = entity;



  /**

   * @private

   * @type {string}

   */

  this.specId_ = specId;



  /**

   * @private

   * @type {!Object.<!Array.<!Object>>}

   */

  this.cache_ = cache;



  /**

   * @private

   * @type {pn.ui.Dialog}

   */

  this.dialog_ = null;



  /**

   * @private

   * @type {!goog.events.EventHandler}

   */

  this.eh_ = new goog.events.EventHandler(this);

  this.registerDisposable(this.eh_);

}