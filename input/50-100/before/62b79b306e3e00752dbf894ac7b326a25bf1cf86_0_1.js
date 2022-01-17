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

}