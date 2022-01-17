function(tag, flags, getter, normalized) {
  goog.base(this, tag, flags);

  /**
   * @private
   * @type {!function():!goog.vec.Quaternion.Float32}
   */
  this.getter_ = getter;

  /**
   * True if the quaternion values are normalized.
   * If so, an optimization can be used that allows for the sending of only
   * 3 floats instead of 4 by inferring w.
   * @private
   * @type {boolean}
   */
  this.normalized_ = normalized;
}