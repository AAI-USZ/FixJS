function (t) {
  var afd = new AccrualFailureDetector();
  var time = 0;
  for (var i = 0;i < 2000;i++) {
    time += 1000;
    afd.add(time);
  }
  t.equal(1000, afd.intervals.length);
  t.end();
}