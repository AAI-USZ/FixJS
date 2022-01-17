function(tag, flags, getter, setter, normalized) {
  goog.base(this, tag, flags);

  /**
   * @private
   * @type {!function():!goog.vec.Quaternion.Float32}
   */
  this.getter_ = getter;

  /**
   * @private
   * @type {!function(!goog.vec.Quaternion.Float32)}
   */
  this.setter_ = setter;

  /**
   * True if the quaternion values are normalized.
   * If so, an optimization can be used that allows for the sending of only
   * 3 floats instead of 4 by inferring w.
   * @private
   * @type {boolean}
   */
  this.normalized_ = normalized;
}