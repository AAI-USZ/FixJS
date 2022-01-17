function(err, res) {
    if (err) {
      global.error('mysql', err);
      return;
    }
    if (!res || !res.length) {
      runController(controller);
    } else {
      var timeleft = 1*res[0].timestamp + 1*controller.interval - 1*common.time();
      if (timeleft < 0) timeleft = 0;
      setTimeout(function() {
        runController(controller);
      }, timeleft);
    }
  }