function() {
  if (!this.disposed_) {
    if (goog.Disposable.ENABLE_MONITORING) {
      if (this.disposed_ == undefined) {
        // The disposed_ member variable is only set in the constructor.
        throw Error(this + ' did not call the goog.Disposable base ' +
                    'constructor');
      }
      var uid = goog.getUid(this);
      delete goog.Disposable.instances_[uid];
    }
    // Set disposed_ to true first, in case during the chain of disposal this
    // gets disposed recursively.
    this.disposed_ = true;
    this.disposeInternal();
  }
}