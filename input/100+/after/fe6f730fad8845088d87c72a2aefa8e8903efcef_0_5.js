function() {
      var n;
      Updater.timeoutID = setTimeout(Updater.timeout, 1000);
      n = 1 + Number(Updater.timer.textContent);
      if (n === 0) {
        return Updater.update();
      } else if (n === Updater.retryCoef) {
        Updater.retryCoef += 10 * (Updater.retryCoef < 120);
        return Updater.retry();
      } else {
        return Updater.timer.textContent = n;
      }
    }