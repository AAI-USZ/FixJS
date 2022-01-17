function() {
      var n;
      Updater.timeoutID = setTimeout(Updater.timeout, 1000);
      n = 1 + Number(Updater.timer.textContent);
      if (n === 0) {
        return Updater.update();
      } else if (n >= Updater.getInterval()) {
        Updater.unsuccessfulFetchCount++;
        Updater.count.textContent = 'Retry';
        Updater.count.className = null;
        return Updater.update();
      } else {
        return Updater.timer.textContent = n;
      }
    }