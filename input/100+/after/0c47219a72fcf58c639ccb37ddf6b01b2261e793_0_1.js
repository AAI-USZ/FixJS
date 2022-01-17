function(callback, after) {
  var timer;

  after *= 1; // coalesce to number or NaN

  if (!(after >= 1 && after <= TIMEOUT_MAX)) {
    after = 1; // schedule on next tick, follows browser behaviour
  }

  timer = { _idleTimeout: after };
  timer._idlePrev = timer;
  timer._idleNext = timer;

  if (arguments.length <= 2) {
    timer._onTimeout = callback;
  } else {
    /*
     * Sometimes setTimeout is called with arguments, EG
     *
     *   setTimeout(callback, 2000, "hello", "world")
     *
     * If that's the case we need to call the callback with
     * those args. The overhead of an extra closure is not
     * desired in the normal case.
     */
    var args = Array.prototype.slice.call(arguments, 2);
    timer._onTimeout = function() {
      callback.apply(timer, args);
    }
  }

  if (process.domain) timer.domain = process.domain;

  exports.active(timer);

  return timer;
}