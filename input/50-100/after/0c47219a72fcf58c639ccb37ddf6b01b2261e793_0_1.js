function(callback, repeat) {
  var timer = new Timer();

  if (process.domain) timer.domain = process.domain;

  repeat *= 1; // coalesce to number or NaN

  if (!(repeat >= 1 && repeat <= TIMEOUT_MAX)) {
    repeat = 1; // schedule on next tick, follows browser behaviour
  }

  var args = Array.prototype.slice.call(arguments, 2);
  timer.ontimeout = function() {
    callback.apply(timer, args);
  }

  timer.start(repeat, repeat);
  return timer;
}