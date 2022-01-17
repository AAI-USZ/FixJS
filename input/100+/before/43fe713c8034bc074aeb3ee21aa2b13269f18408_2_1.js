function() {
  if (this.unhandledExceptionTimeoutId_ && this.hasFired() &&
      this.hasErrback_()) {
    // It is possible to add errbacks after the Deferred has fired. If a new
    // errback is added immediately after the Deferred encountered an unhandled
    // error, but before that error is rethrown, cancel the rethrow.
    goog.global.clearTimeout(this.unhandledExceptionTimeoutId_);
    delete this.unhandledExceptionTimeoutId_;
  }

  if (this.parent_) {
    this.parent_.branches_--;
    delete this.parent_;
  }

  var res = this.result_;
  var unhandledException = false;
  var isChained = false;

  while (this.chain_.length && this.paused_ == 0) {
    var chainEntry = this.chain_.shift();

    var callback = chainEntry[0];
    var errback = chainEntry[1];
    var scope = chainEntry[2];

    var f = this.hadError_ ? errback : callback;
    if (f) {
      try {
        var ret = f.call(scope || this.defaultScope_, res);

        // If no result, then use previous result.
        if (goog.isDef(ret)) {
          // Bubble up the error as long as the return value hasn't changed.
          this.hadError_ = this.hadError_ && (ret == res || this.isError(ret));
          this.result_ = res = ret;
        }

        if (res instanceof goog.async.Deferred) {
          isChained = true;
          this.pause_();
        }

      } catch (ex) {
        res = ex;
        this.hadError_ = true;

        if (!this.hasErrback_()) {
          // If an error is thrown with no additional errbacks in the queue,
          // prepare to rethrow the error.
          unhandledException = true;
        }
      }
    }
  }

  this.result_ = res;

  if (isChained && this.paused_) {
    res.addCallbacks(
        goog.bind(this.continue_, this, true /* isSuccess */),
        goog.bind(this.continue_, this, false /* isSuccess */));
    res.chained_ = true;
  }

  if (unhandledException) {
    // Throw an UnhandledError after a timeout. Execution will continue, but
    // the error will be seen by global handlers and the user. The throw will
    // be canceled if another errback is appended before the timeout executes.
    this.unhandledExceptionTimeoutId_ = goog.global.setTimeout(function() {
      throw new goog.async.Deferred.UnhandledError(/** @type {!Error} */ (res));
    }, 0);
  }
}