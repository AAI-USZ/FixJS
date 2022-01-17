function() {
  if (!this.disposed_) {
    // Set disposed_ to true first, in case during the chain of disposal this
    // gets disposed recursively.
    this.disposed_ = true;
    this.disposeInternal();
    if (goog.Disposable.ENABLE_MONITORING) {
      var uid = goog.getUid(this);
      if (!goog.Disposable.instances_.hasOwnProperty(uid)) {
        throw Error(this + ' did not call the goog.Disposable base ' +
            'constructor or was disposed of after a clearUndisposedObjects ' +
            'call');
      }
      delete goog.Disposable.instances_[uid];
    }
  }
}