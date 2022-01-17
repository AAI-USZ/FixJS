function run (label, fn) {
  console.error('running %s', label);
  var started = process.memoryUsage();
  var start = new Date;
  var total = 10000;
  var i = total;
  while (i--) {
    a = fn();
    if (i%2)
      a.toObject({ depopulate: true });
    else
      a._delta();
  }
  var time = (new Date - start)/1000;
  console.error(label + ' took %d seconds for %d docs (%d dps)', time, total, total/time);
  var used = process.memoryUsage();
  console.error(((used.vsize - started.vsize) / 1048576)+' MB');
}