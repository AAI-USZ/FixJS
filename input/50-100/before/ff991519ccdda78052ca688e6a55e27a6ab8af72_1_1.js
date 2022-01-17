function(err, res) {
    if (err) {
      global.error('mysql', err);
      return;
    }
    if (!res || !res.length) {
      runController(controller);
    } else {
      var timeleft = res[0].timestamp + controller.interval - common.time();
      if (timeleft < 0) timeleft = 0;

      setTimeout(function() {
        runController(controller);
      }, timeleft);
    }
  }