function(tag, flags, getter) {
  goog.base(this, tag, flags);

  /**
   * @private
   * @type {!function():!goog.vec.Vec3.Float32}
   */
  this.getter_ = getter;
}