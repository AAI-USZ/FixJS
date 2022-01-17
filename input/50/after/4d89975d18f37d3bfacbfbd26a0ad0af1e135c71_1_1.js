function(tag, flags, getter, setter) {
  goog.base(this, tag, flags);

  /**
   * @private
   * @type {!function():!goog.vec.Vec3.Float32}
   */
  this.getter_ = getter;

  /**
   * @private
   * @type {!function(!goog.vec.Vec3.Float32)}
   */
  this.setter_ = setter;
}