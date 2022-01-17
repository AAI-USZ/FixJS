function(e,
    opt_context) {
  var error = (/** @type {!Error} */ goog.debug.normalizeErrorObject(e));

  // Construct the context, possibly from the one provided in the argument, and
  // pass it to the context provider if there is one.
  var context = opt_context ? goog.object.clone(opt_context) : {};
  if (this.contextProvider_) {
    try {
      this.contextProvider_(error, context);
    } catch (err) {
      goog.debug.ErrorReporter.logger_.severe('Context provider threw an ' +
          'exception: ' + err.message);
    }
  }
  this.sendErrorReport(error.message, error.fileName, error.lineNumber,
      error.stack, context);

  try {
    this.dispatchEvent(
        new goog.debug.ErrorReporter.ExceptionEvent(error, context));
  } catch (ex) {
    // Swallow exception to avoid infinite recursion.
  }
}