function(
    entityOrSphere, callback, opt_scope) {
  var sphere = gf.sim.search.ListDatabase.tmpVec4_;
  if (entityOrSphere instanceof gf.sim.entities.SpatialEntity) {
    entityOrSphere.getBoundingSphere(sphere);
  } else {
    sphere = /** @type {!goog.vec.Vec4.Float32} */ (entityOrSphere);
  }
  for (var n = 0; n < this.entities_.length; n++) {
    var entity = this.entities_[n];
    // TODO(benvanik): test sphere-sphere
    if (callback.call(opt_scope || goog.global, this.entities_[n]) === false) {
      break;
    }
  }
}