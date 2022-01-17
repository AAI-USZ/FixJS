function run (label, fn) {
  log('running %s', label);
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
  totaltime += time;
  numdocs += total;
  log(label + ' took %d seconds for %d docs (%d dps)', time, total, total/time);
  var used = process.memoryUsage();
  var res = {}
  res.rss  = used.rss - started.rss;
  res.heapTotal = used.heapTotal - started.heapTotal;
  res.heapUsed = used.heapUsed - started.heapUsed;
  log('change: ', res);
  a = res = used = time = started = start = total = i = null
  //console.error(((used.vsize - started.vsize) / 1048576)+' MB');
}