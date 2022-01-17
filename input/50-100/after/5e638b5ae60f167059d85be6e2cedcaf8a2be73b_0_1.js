function (cb) {
  /* wait for up to 100 ticks so /etc/resolv.conf can be parsed */
  var ticks = 100;

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