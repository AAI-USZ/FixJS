function(callback, opt_scope) {
  for (var entityId in this.entities_) {
    var entity = this.entities_[Number(entityId)];
    callback.call(opt_scope || goog.global, entity);
  }
}