function (interval) {
    window.clearInterval(self.reloadInterval);

    self.reloadInterval = window.setInterval(self.reloadData, interval);

    // The status is always updated every 10 seconds. This does not
    // remote calls, and is not computationally intensive, so it should
    // not be a burden on either server or client.
    self.updateInterval = window.setInterval(self.updateStatusAll, 10000);
  }