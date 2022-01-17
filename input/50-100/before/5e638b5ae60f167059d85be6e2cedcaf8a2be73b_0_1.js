function (cb) {
  /* wait for up to 5 ticks so /etc/resolv.conf can be parsed */
  var ticks = 5;

  var checkReady = function () {
    process.nextTick(function () {
      if (platform.ready) {
        fixupDns(cb);
      } else {
        ticks -= 1;
        if (ticks > 0)
          checkReady();
      }
    })
  }

  if (platform.ready)
    fixupDns(cb);
  else
    checkReady();
}