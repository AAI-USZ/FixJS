function() {
    if(this.running) return;

    var MAXDELAY = 2147483647; // The maximum number of milliseconds setTimeout will wait.
    var self = this;
    var timeout = this.cronTime.getTimeout();
    var remaining = 0;

    if (this.cronTime.realDate) this.runOnce = true;

    // The callback wrapper checks if it needs to sleep another period or not
    // and does the real callback logic when it's time.

    function callbackWrapper() {

      // If there is sleep time remaining, calculate how long and go to sleep
      // again. This processing might make us miss the deadline by a few ms
      // times the number of sleep sessions. Given a MAXDELAY of almost a
      // month, this should be no issue.

      if (remaining) {
        if (remaining > MAXDELAY) {
          remaining -= MAXDELAY;
          timeout = MAXDELAY;
        } else {
          timeout = remaining;
          remaining = 0;
        }

        self._timeout = setTimeout(callbackWrapper, timeout);
      } else {

        // We have arrived at the correct point in time.

        self.running = false;

        //start before calling back so the callbacks have the ability to stop the cron job
        if (!(self.runOnce)) self.start();

        self._callback();
      }
    }

    if (timeout >= 0) {
      this.running = true;

      // Don't try to sleep more than MAXDELAY ms at a time.

      if (timeout > MAXDELAY) {
        remaining = timeout - MAXDELAY;
        timeout = MAXDELAY;
      }

      this._timeout = setTimeout(callbackWrapper, timeout);
    } else {
      this.stop();
    }
  }